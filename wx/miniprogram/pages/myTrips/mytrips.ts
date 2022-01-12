// pages/myTrips/mytrips.ts
import { ProfileService } from "../../service/profile";
import { rental } from "../../service/proto_gen/rental/rental_pb";
import { TripService } from "../../service/trip";
import {routing} from "../../utils/routing";
import {wxApi} from "../../utils/wxapi";

function padString(n: number) {
  return n < 10 ? '0'+n.toFixed(0) : n.toFixed(0)
}

function formatDuration(sec: number) {
  const h = Math.floor(sec/3600)
  sec -= 3600 * h
  const m = Math.floor(sec / 60)
  sec -= 60 * m
  const s = Math.floor(sec)
  return {
      hh: padString(h),
      mm: padString(m),
      ss: padString(s),
  }
}

function formatFee(cents: number) {
  return (cents / 100).toFixed(2)
}

interface Trip {
  id: string
  shortId: string
  start: string
  end: string
  duration: string
  fee: string
  distance: string
  status: string
  inProgress:boolean
}

interface MainItem {
  id: string
  navId: string
  navScrollId: string
  data: Trip
}

interface NavItem {
  id: string
  mainId: string
  label: string
}

interface MainItemQueryResult {
  id: string
  top: number
  dataset: {
    navId: string
    navScrollId: string
  }
}

const tripStatusMap = new Map([
  [rental.v1.TripStatus.IN_PROGRESS, '进行中'],
  [rental.v1.TripStatus.FINISHED, '已完成'],
])

const licStatusMap = new Map([
  [rental.v1.IdentityStatus.UN_SUBMITTED, '未认证'],
  [rental.v1.IdentityStatus.PENDING, '未认证'],
  [rental.v1.IdentityStatus.VERIFIED, '已认证'],
])

Page({
  scrollStates: {
    mainItems: [] as MainItemQueryResult[],
  },

  layoutResolver: undefined as (()=>void)|undefined,
  /**
   * 页面的初始数据
   */
  data: {
    share_location: false as boolean | undefined,
    userInfo: {},
    hasUserInfo: false,
    avatarURL: '',
    canIUseGetUserProfile: false,
    promotionItems:[
      {
        promotionID:1,
        img:'https://img1.mukewang.com/61ad792b0001e8db17920764.jpg',
      },
      {
        promotionID:2,
        img:'https://img3.mukewang.com/61b014860001e48017920764.jpg',
      },
      {
        promotionID:3,
        img:'https://img3.mukewang.com/619daa530001892a17920764.jpg',
      },
      {
        promotionID:4,
        img:'https://img2.mukewang.com/61a58b4f00019d4217920764.jpg',
      },
    ],
    tripsHeight:0,
    navCount: 0,
    mainItems: [] as MainItem[],
    mainScroll: '',
    navItems: [] as NavItem[],
    navSel: '',
    navScroll: '',
    licStatus:licStatusMap.get(rental.v1.IdentityStatus.UN_SUBMITTED),
  },
  // 轮播转换
  onSwiperChange(e:any) {
    if (!e.detail.source) {
      // 程序内部改变
    } else {
      // 自动 或 手动 改变
    }
    //console.log(e)
  },
  // 点击轮播事件
  onPromotionItemTap(e:any) {
    console.log(e.currentTarget.dataset.promotionId);
  },
  // 点击资格认证
  onRegisterTap() {
    wx.navigateTo({
      //url:'/pages/register/register'
      url:routing.register()
    }).catch()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
  Promise.all([TripService.GetTripList()]).then(([trips]) => {
      this.populateTrips(trips)
  })
    this.checkedUserInfo()
  },
  // 确认用户头像
  checkedUserInfo() {
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

  // 模拟行程数据
  populateTrips(res: rental.v1.IGetTripListResponse) {
    let trips = res.tripList
    const mainItems: MainItem[] = []
    const  navItems: NavItem[] = []
    let navSel = ''
    let prevNav = ''
    for (let i = 0 ; i< trips!.length; i++ ) {
      const trip = trips![i]
      const mainId = 'main-' + i
      const navId = 'nav-' + i
      const shortId = trip.id?.slice(trip.id.length-6)
      
     // const trip = trips[i]
      //const shortId = trip.id?.substr(trip.id.length-6)
      if (!prevNav) {
        prevNav = navId
      }
      const tripData: Trip = {
        id: trip.id!,
        shortId: '****'+shortId,
        start: trip.trip?.start?.locationName||'未知',
        end: '',
        distance: '',
        duration: '',
        fee: '',
        status: tripStatusMap.get(trip.trip?.status!)||'未知',
        inProgress: trip.trip?.status ===  rental.v1.TripStatus.IN_PROGRESS,
    }
    const end = trip.trip?.end
    if (end) {
        tripData.end = end.locationName||'未知',
        tripData.distance = (end.kmDriven!/1000)?.toFixed(1)+'公里',
        tripData.fee = formatFee(end.feeCent||0)
        const dur = formatDuration((end.timestampSec||0) - (trip.trip?.start?.timestampSec||0))
        tripData.duration = `${dur.hh}时${dur.mm}分`
    }
    mainItems.push({
        id: mainId,
        navId: navId,
        navScrollId: prevNav,
        data: tripData,
    })
    navItems.push({
        id: navId,
        mainId: mainId,
        label: shortId||'',
    })
    if (i === 0) {
        navSel = navId
    }
    prevNav = navId
    }
    for (let i = 0; i < this.data.navCount-1; i++) {
      navItems.push({
        id: '',
        mainId: '',
        label: '',
      })
    }
    this.setData({
      mainItems,
      navItems,
      navSel,
    }, () => {
      this.prepareScrollStates()
    })
  },
  prepareScrollStates() {
    wx.createSelectorQuery().selectAll('.main-item')
        .fields({
          id: true,
          dataset: true,
          rect: true,
        }).exec(res => {
      this.scrollStates.mainItems = res[0]
    })
  },
  // 滚动导航
  onNavItemTap(e:any) {
    const mainId: string = e.currentTarget?.dataset?.mainId
    const navId: string = e.currentTarget?.id
    if (mainId && navId) {
      this.setData({
        mainScroll: mainId,
        navSel: navId,
      })
    }
  },
  onMainScroll(e: any) {
    console.log(e)
    const top: number = e.currentTarget?.offsetTop + e.detail?.scrollTop
    if (top === undefined) {
      return
    }

    const selItem = this.scrollStates.mainItems.find(
        v => v.top >= top)
    if (!selItem) {
      return
    }

    this.setData({
      navSel: selItem.dataset.navId,
      navScroll: selItem.dataset.navScrollId,
    })
  },

  onMainItemTap(e: any) {
    if (!e.currentTarget.dataset.tripInProgress) {
      return
    }
    const tripId = e.currentTarget.dataset.tripId
    if (tripId) {
      wx.redirectTo({
        url: routing.driving({
          trip_id: tripId,
        }),
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
      // 获取滚动容器高度
    wx.createSelectorQuery().select('#heading')
        .boundingClientRect(rect => {
          const height = wx.getSystemInfoSync().windowHeight - rect.height
          this.setData({
            tripsHeight:height,
            navCount:Math.round(height/50)
          })
        }).exec()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  async onShow() {
    const licStatusResult = await ProfileService.getProfile()
    this.setData({
      licStatus:licStatusMap.get(licStatusResult.identityStatus || 0)
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})