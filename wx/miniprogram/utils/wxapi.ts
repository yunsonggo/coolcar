export namespace wxApi {
    export interface checkParams {
        ShareKey:string
        UserInfoKey:string
    }
    export interface checkResult {
        ShareLocation:boolean | undefined
        CanUse:boolean | undefined
        HasUserInfo:boolean | undefined
        UserInfo:object | undefined
        AvatarURL:string
    }
    // 根据storage确认用户信息状态
    export  function  checkUserInfo  (o:checkParams)  {
        let result : checkResult = {
            ShareLocation: false,
            CanUse: false,
            HasUserInfo: false,
            UserInfo: undefined,
            AvatarURL:'',
        }
            let share = wx.getStorageSync(o.ShareKey)
            if (share === true) {
                result.ShareLocation = true
                result.CanUse = true
            }
            let user = wx.getStorageSync(o.UserInfoKey)
            if (user) {
                let userData = JSON.parse(user)
                result.UserInfo = userData
                result.HasUserInfo = true
                if (share === true ) {
                    result.AvatarURL=userData.avatarUrl
                }
            }
        return result
    }
}