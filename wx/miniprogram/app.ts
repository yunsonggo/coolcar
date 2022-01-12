import {IAppOption} from "./appoption"
import { Coolcar } from "./service/request"

App<IAppOption>({
  globalData: {},
  onLaunch() {
    // 静默登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        Coolcar.login()
      },
    })
  },
})