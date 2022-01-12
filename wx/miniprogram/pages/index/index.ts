import { TripService } from "../../service/trip";
import {routing} from "../../utils/routing";
import {wxApi} from "../../utils/wxapi";
import { rental } from "../../service/proto_gen/rental/rental_pb";
import { ProfileService } from "../../service/profile";
import { formateFunc } from "../../utils/formateFunc";
import { GunService } from "../../service/gun";

interface Marker {
    iconPath: string
    id: number
    latitude: number
    longitude: number
    width: number
    height: number
  }
  const defaultAvatar = '/resources/car.png'
  const initialLat = 35.766839
  const initialLng = 115.066103
Page({
    isPageShowing: false,
    socket:undefined as WechatMiniprogram.SocketTask | undefined,
    data: {
        share_location: false as boolean | undefined,
        userInfo: {},
        hasUserInfo: false,
        avatarURL: '',
        canIUseGetUserProfile: false,
        setting: {
            skew: 0,
            rotate: 0,
            showLocation: true,
            showScale: true,
            subKey: '',
            layerStyle: -1,
            enableZoom: true,
            enableScroll: true,
            enableRotate: false,
            showCompass: false,
            enable3D: false,
            enableOverlooking: false,
            enableSatellite: false,
            enableTraffic: false,
        },
        location: {
            latitude: 35.766839,
            longitude: 115.065103,
        },
        scale: 16,
        markers: [
            {
                iconPath: "/resources/car.png",
                id: 0,
                latitude: 35.766839,
                longitude: 115.065103,
                width: 25,
                height: 25,
            },
            {
                iconPath: "/resources/car.png",
                id: 1,
                latitude: 35.767839,
                longitude: 115.066103,
                width: 25,
                height: 25,
            }
        ]
    },
    onLoad(){
        this.socket = GunService.subscribe(msg => {
            console.log(msg);
        })

        // 根据storage确认用户信息状态
        let checkParam : wxApi.checkParams = {
            ShareKey:'share',
            UserInfoKey:'userInfo',
        }
        let res : wxApi.checkResult = wxApi.checkUserInfo(checkParam)
        this.setData({
            share_location:res.ShareLocation,
            hasUserInfo:res.HasUserInfo,
            canIUseGetUserProfile:res.CanUse,
            userInfo:res.UserInfo,
            avatarURL:res.AvatarURL
        })
    },
    // 页面显示触发
    onShow() {
        this.isPageShowing = true;
        if (!this.socket) {
          this.setData({
            markers: []
          }, () => {
            this.setupCarPosUpdater()
          })
        }
      },
    // 页面隐藏触发
    onHide() {
        this.isPageShowing = false;
        if (this.socket) {
          this.socket.close({
            success: () => {
              this.socket = undefined
            }
          })
        }
      },
    // 点击定位
    onMyLocationTap() {
        wx.getLocation({
            type: 'gcj02',
            success: res => {
                this.setData({
                    location: {
                        latitude: res.latitude,
                        longitude: res.longitude,
                    }
                })
            },
            fail:() => {
                wx.showToast({
                    icon:'none',
                    title:'右上角-三点-设置-授权使用位置',
                    duration:2000,
                })
            }
        })
    },
    // 点击扫码
    async onScanClicked() {
        const tripsResult = await TripService.GetTripList(rental.v1.TripStatus.IN_PROGRESS)
        if ((tripsResult.tripList?.length || 0) > 0) {
            await this.selectComponent('#tripModal').showModal()
            wx.navigateTo({
                url:routing.driving({
                    trip_id:tripsResult.tripList![0].id!,
                })
            })
            return
        }
        wx.scanCode({
            success: async (res) => {
                let gunId = ''
                if (res.result) {
                    if (formateFunc.isJsonString(res.result)) {
                        let jr = JSON.parse(res.result)
                        if (jr.id) {
                            gunId = jr.id
                        } 
                    }
                } 
                if (gunId === '') {
                    wx.showToast({
                        icon:'none',
                        title:'二维码无效',
                        duration:2000,
                    })
                    return
                }
                // 携带car id 跳转 注册审查 页面
                //const redirectURL = `/pages/lock/lock?car_id=${carId}`
                const lockURL = routing.lock({
                    gun_id:gunId
                })

                const prof = await ProfileService.getProfile()
                if (prof.identityStatus === rental.v1.IdentityStatus.VERIFIED) {
                    wx.navigateTo({
                        url:lockURL
                    })
                } else {
                    await this.selectComponent('#licModal').showModal()
                        
                    wx.navigateTo({
                        // url: `/pages/register/register?redirect=${encodeURIComponent(redirectURL)}`
                        url:routing.register({
                            redirectURL:lockURL
                        })
                    }).catch()
                }
            },
            fail:() => {
                wx.showToast({
                    icon:'none',
                    title:'二维码无效',
                    duration:2000,
                })
            },
        })
    },

    // 跳转行程列表
    onMyTrips() {
        wx.navigateTo({
            //url:'/pages/myTrips/mytrips'
            url:routing.mytrips()
        }).catch()
    },
    setupCarPosUpdater() {
        const map = wx.createMapContext("map")
        const markersByGunID = new Map<string, Marker>()
        let translationInProgress = false
        const endTranslation = () => {
          translationInProgress = false
        }
        this.socket = GunService.subscribe(gun => {
          if (!gun.id || translationInProgress || !this.isPageShowing) {
            console.log('dropped')
            return
          }
          const marker = markersByGunID.get(gun.id)
          if (!marker) {
            // Insert new marker.
            const newMarker: Marker = {
              id: this.data.markers.length,
              iconPath: gun.gun?.driver?.avatarUrl || defaultAvatar,
              latitude: gun.gun?.position?.latitude || initialLat,
              longitude: gun.gun?.position?.longitude || initialLng,
              height: 20,
              width: 20,
            }
            markersByGunID.set(gun.id, newMarker)
            this.data.markers.push(newMarker)
            translationInProgress = true
            this.setData({
              markers: this.data.markers,
            }, endTranslation)
            return
          }
    
          const newAvatar = gun.gun?.driver?.avatarUrl || defaultAvatar
          const newLat = gun.gun?.position?.latitude || initialLat
          const newLng = gun.gun?.position?.longitude || initialLng
          if (marker.iconPath !== newAvatar) {
            // Change iconPath and possibly position.
            marker.iconPath = newAvatar
            marker.latitude = newLat
            marker.longitude = newLng
            translationInProgress = true
            this.setData({
              markers: this.data.markers,
            }, endTranslation)
            return
          }
    
          if (marker.latitude !== newLat || marker.longitude !== newLng) {
            // Move marker.
            translationInProgress = true
            map.translateMarker({
              markerId: marker.id,
              destination: {
                latitude: newLat,
                longitude: newLng,
              },
              autoRotate: false,
              rotate: 0,
              duration: 80,
              animationEnd: endTranslation,
            })
          }
        })
      },
})
