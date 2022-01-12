// pages/register/register.ts
import { ProfileService } from "../../service/profile";
import { rental } from "../../service/proto_gen/rental/rental_pb";
import {routing} from "../../utils/routing";
import {formateFunc} from "../../utils/formateFunc"
import { Coolcar } from "../../service/request";

Page({
  redirectURL:'',
  profileRefresher:0,
  /**
   * 页面的初始数据
   */
  data: {
    licImgURL:'',
    genders:['未知','先生','女士'],
    genderIndex:0,
    licNo:undefined as string | undefined,
    name:undefined as string | undefined,
    date: '',
    state: rental.v1.IdentityStatus[rental.v1.IdentityStatus.UN_SUBMITTED]
  },
 // 点击上传照片
  onUploadLic() {
    wx.chooseImage({
      success:async res => {
        if (res.tempFilePaths.length === 0) {
          return
        }
        this.setData({
          licImgURL: res.tempFilePaths[0]
        })
        const photoRes = await ProfileService.createProfilePhoto()
        if (!photoRes.uploadUrl) {
          return
        }
        await Coolcar.uploadFile({
          localPath:res.tempFilePaths[0],
          url:photoRes.uploadUrl,
        })
        const identity = await ProfileService.completeProfilePhoto()
        this.renderIdentity(identity)
      },
      fail:console.error,
    })
  },
  // 选择性别
  onGenderChange(e:any) {
    this.setData({
      genderIndex:parseInt(e.detail.value),
    })
  },
  // 选择日期
  onDateChange(e:any) {
    this.setData({
      date:e.detail.value
    })
  },
  // 重新审查
  onResubmit() {
    wx.showModal({
      title: '提示',
      content: '确定要重新审查吗',
      success: result => {
        if (result.confirm) {
          ProfileService.clearProfile().then(p => this.renderProfile(p))
          ProfileService.clearProfilePhoto().then(() => {
            this.setData({
              licImgURL:''
            })
          })
          
        }
      }
    })
  },
  // 审查通过
  onLicVerified() {
    wx.showToast({
      title: '审查成功',
      icon: 'success',
      duration: 2000
    })
    setTimeout(() => {
      if (this.redirectURL) {
      wx.redirectTo({
        url:this.redirectURL
      })
    }
    }, 2000);
    
  },
  // 提交审查
  onSubmit() {
    // TODO: submit
    ProfileService.submitProfile({
      licNumber:this.data.licNo,
      name:this.data.name,
      gender:this.data.genderIndex,
      birthDataMillis:Date.parse(this.data.date)
    }).then(p => {
      this.renderProfile(p)
      this.scheduleProfileRefresher()
    })
  },

  //轮询状态
  scheduleProfileRefresher() {
    this.profileRefresher = setInterval(() => {
      ProfileService.getProfile().then(p => {
        if (p.identityStatus !== rental.v1.IdentityStatus.PENDING) {
          this.clearProfileRefresher()
        }
        this.renderProfile(p)
      })
    },1000)
  },
  // 清除轮询
  clearProfileRefresher() {
    if(this.profileRefresher) {
      clearInterval(this.profileRefresher)
      this.profileRefresher = 0
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(opt:Record<'redirect',string>) {
    const o: routing.RegisterOpts = opt
    // 跳转判断
    // 如果是从index 扫码跳转过来的 url中有 redirect参数
    if (o.redirect) {
      this.redirectURL= decodeURIComponent(o.redirect)
    }
    ProfileService.getProfile().then(p => {
      this.renderProfile(p)
    })
    ProfileService.getProfilePhoto().then(p => {
      this.setData({
        licImgURL: p.url || ''
      })
    })
  },

  // 
  renderProfile(p: rental.v1.IProfile) {
    this.setData({
      licNo:p.identity?.licNumber || '',
      name:p.identity?.name || '',
      genderIndex:p.identity?.gender || 0,
      date:formateFunc.formateDate(p.identity?.birthDataMillis || 0) ,
      state:rental.v1.IdentityStatus[p.identityStatus || 0]
    })
    if (p.identityStatus === rental.v1.IdentityStatus.VERIFIED) {
      this.onLicVerified()
    }
  },
  renderIdentity(i?: rental.v1.IIdentity) {
    this.setData({
      licNo: i?.licNumber||'',
      name: i?.name||'',
      genderIndex: i?.gender||0,
      date: formateFunc.formateDate(i?.birthDataMillis||0),
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

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
    this.clearProfileRefresher()
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