import { routing } from "../../utils/routing";
import { TripService } from "../../service/trip"
import { GunService } from "../../service/gun";
import { gun } from "../../service/proto_gen/gun/gun_pb";
import { rental } from "../../service/proto_gen/rental/rental_pb";

Page({
  gunRefresher: 0,
  /**
   * 页面的初始数据
   */
  data: {
    share_location: false as boolean | undefined,
    userInfo: {},
    hasUserInfo: false as boolean | undefined,
    avatarURL: '',
    canIUseGetUserProfile: false as boolean | undefined,
    gunId: '',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(opt: Record<'gun_id', string>) {
    const o: routing.LockOpts = opt
    console.log('lock page gun id:', o.gun_id)
    this.setData({
      gunId: o.gun_id
    })
    // 确认用户信息
    this.checkUserInfo()
  },

  // 获取用户信息
  getUserProfile() {
    wx.getUserProfile({
      desc: '用于完善用户资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        wx.setStorage({
          key: "userInfo",
          data: JSON.stringify(res.userInfo)
        }).catch()
        wx.setStorage({
          key: "share",
          data: true
        }).catch()
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          canIUseGetUserProfile: true,
          avatarURL: res.userInfo.avatarUrl,
          share_location: true,
        })
      }
    })
  },
  // 是否显示头像
  onShareLocation(e: any) {
    const shareLocation: boolean = e.detail.value
    wx.setStorage({
      key: 'share',
      data: shareLocation
    }).catch()
    this.setData({
      share_location: shareLocation
    })
    if (!shareLocation) {
      this.setData({
        avatarURL: '',
        canIUseGetUserProfile: false,
      })
    }
  },
  // 立即开锁
  onUnlockTap() {
    // 获取定位地址
    wx.getLocation({
      type: 'gcj02',
      success: async loc => {
        //模拟创建行程ID
        if (!this.data.gunId) {
          console.error('gun id losted')
          return
        }
        let trip: rental.v1.ITripEntity
        try {
          trip = await TripService.CreateTrip({
            start: {
              latitude:loc.latitude,
              longitude:loc.longitude,
            },
            gunId: this.data.gunId,
            avatarUrl: this.data.share_location ? this.data.avatarURL : '',
          })
          if (!trip.id) {
            console.error("no trip id,trip:", trip)
            return
          }
        } catch (err) {
          wx.showToast({
            title: '创建行程失败',
            icon: 'none',
          })
          return
        }
        wx.showLoading({
          title: '校验中...',
          mask: true,
        }).catch()
        //TODO::
        this.gunRefresher = setInterval(async () => {
          const result = await GunService.getGun(this.data.gunId)
          if (result.status === gun.v1.GunStatus.UNLOCKED) {
            this.clearGunRefresher()
            wx.redirectTo({
              // url:`/pages/driving/driving?trip_id=${tripId}`,
              url: routing.driving({
                trip_id: trip.id!,
              }),
              complete: () => {
                wx.hideLoading({
                  success: console.log
                })
              }
            })
          }
        }, 2000)
      },
      fail: () => {
        wx.showToast({
          icon: 'none',
          title: '请点击三个点-设置-授权使用地理位置'
        }).catch()
      }
    })
  },

  clearGunRefresher() {
    if (this.gunRefresher) {
      clearInterval(this.gunRefresher)
      this.gunRefresher = 0
    }
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    this.clearGunRefresher()
    wx.hideLoading()
  },

  // 根据storage确认用户信息状态
  checkUserInfo() {
    try {
      let share = wx.getStorageSync('share')
      if (share === true) {
        console.log("share true")
        this.setData({
          share_location: true,
          canIUseGetUserProfile: true,
        })
      }
      let user = wx.getStorageSync('userInfo')
      if (user) {
        let userData = JSON.parse(user)
        console.log(userData)
        this.setData({
          hasUserInfo: true,
          userInfo: userData,
        })
        if (share === true) {
          this.setData({
            avatarURL: userData.avatarUrl
          })
        }
        console.log(this.data.avatarURL)
      }
    } catch (e) {
      // Do something when catch error
    }
  }
})