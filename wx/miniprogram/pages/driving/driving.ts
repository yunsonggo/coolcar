// pages/driving/driving.ts

import { TripService } from "../../service/trip";
import { routing } from "../../utils/routing";
import { formateFunc } from "../../utils/formateFunc";
import { rental } from "../../service/proto_gen/rental/rental_pb";
import { GunService } from "../../service/gun";

const updateIntervalSec = 5
let initialLat = 35.766839
let initialLng = 115.065103
//let speed = 0

function durationStr(sec: number) {
  const dur = formateFunc.formatDuration(sec)
  return `${dur.hh}:${dur.mm}:${dur.ss}`
}

Page({
  timer: undefined as number | undefined,
  tripId: '',
  /**
   * 页面的初始数据
   */
  data: {
    location: {
      latitude: initialLat,
      longitude: initialLng,
    },
    scale: 16,
    // 计时
    elapsed: "00:00:00",
    // 计费
    fee: '0.00',
    speed:0,
    gunClass:'',
    markers: [
      {
        iconPath: "/resources/car.png",
        id: 0,
        latitude: initialLat,
        longitude: initialLng,
        width: 20,
        height: 20,
      },
    ],
  },
  onLoad(opt: Record<'trip_id', string>) {
    const o: routing.DrivingOpts = opt
    this.tripId = o.trip_id
    this.setUpdateLocation()
    this.setUpdateTimer(o.trip_id)
  },
  onUnload() {
    wx.stopLocationUpdate()
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  // 更新坐标
  setUpdateLocation() {
    wx.startLocationUpdate({
      fail: console.error
    })
    // wx.startLocationUpdateBackground({

    // })
    wx.onLocationChange(loc => {
      console.log(loc);
      initialLat = loc.latitude
      initialLng = loc.longitude
      this.setData({
        location: {
          latitude: loc.latitude,
          longitude: loc.longitude,
        },
      })
      if (loc.speed > 0) {
        this.setData({
          speed:loc.speed
        })
      }
    })
  },
  // 计时
  async setUpdateTimer(tripId: string) {
    const trip = await TripService.GetTrip(tripId)
        if (trip.status !== rental.v1.TripStatus.IN_PROGRESS) {
            console.error('trip not in progress')
            return
        }
        let secSinceLastUpdate = 0
        let lastUpdateDurationSec = trip.current!.timestampSec! - trip.start!.timestampSec!
        const toLocation = (trip: rental.v1.ITrip) => ({
            latitude: trip.current?.location?.latitude || initialLat,
            longitude: trip.current?.location?.longitude || initialLng,
        })
        const location = toLocation(trip)
        this.data.markers[0].latitude = location.latitude
        this.data.markers[0].longitude = location.longitude
        this.setData({
            elapsed: durationStr(lastUpdateDurationSec),
            fee: formateFunc.formatFee(trip.current!.feeCent!),
            location,
            markers: this.data.markers,
        })
        const gun = await GunService.getGun(trip.gunId!)
        if (gun) {
          this.setData({
            gunClass:gun.class!
          })
        }
        let kmSec = 0
        this.timer = setInterval(() => {
            kmSec ++
            secSinceLastUpdate++
            if (secSinceLastUpdate % updateIntervalSec === 0) {
              TripService.updateTrip({
                id:tripId,
                current:{
                  location:this.data.location,
                  locationName:this.data.gunClass,
                  kmDriven:this.data.speed * kmSec,
                }
              }).then(res => {
                console.log(res);
                
                this.data.markers[0].latitude = this.data.location.latitude
                this.data.markers[0].longitude = this.data.location.longitude
                this.setData({
                  markers:this.data.markers
                })
              })
                // TripService.GetTrip(tripId).then(trip => {
                //   console.log(trip);
                //     lastUpdateDurationSec = trip.current!.timestampSec! - trip.start!.timestampSec!
                //     secSinceLastUpdate = 0
                //     const location = toLocation(trip)
                //     this.data.markers[0].latitude = location.latitude
                //     this.data.markers[0].longitude = location.longitude
                //     this.setData({
                //         fee: formateFunc.formatFee(trip.current!.feeCent!),
                //         location,
                //         markers: this.data.markers,
                //     })
                // }).catch(console.error)
            }
            this.setData({
                elapsed: durationStr(lastUpdateDurationSec + secSinceLastUpdate),
            })
        }, 1000)
  },

  // 结束行程
  onEndTripTap() {
    console.log(this.tripId);
    
    TripService.finishTrip(this.tripId).then(() => {
      wx.stopLocationUpdate()
      if (this.timer) {
        clearInterval(this.timer)
      }
      wx.redirectTo({
        url: '/pages/index/index'
      })
    }).catch(err => {
      console.error(err)
      wx.showToast({
        title: '结束行程失败',
        icon: 'none',
      })
    })}
})