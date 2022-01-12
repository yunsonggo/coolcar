import camelcaseKeys from "camelcase-keys"
import { auth } from "./proto_gen/auth/auth_pb"


export namespace Coolcar {
    export const BASE_URL = 'http://localhost:8080'
    export const WS_ADDR = 'ws://localhost:9090'
    const AUTH_ERR = 'AUTH_ERR'
    // token
    const authData = {
        token:'',
        expireMs:0,
    }
    // 请求参数
    export interface RequestOption <REQ,RES>{
        method: 'GET' | 'POST' | 'PUT' | 'DELETE',
        url:string,
        data?:REQ,
        resMarshaller: (r: object) => RES
    }
    // 验证参数
    export interface AuthOption {
        attachAuthHeader: boolean
        retryOnAuthErr :boolean
    }
    
    // 封装wx.login()
    function wxLogin(): Promise<WechatMiniprogram.LoginSuccessCallbackResult> {
        return new Promise((resolve,reject) => {
            wx.login({
                success:resolve,
                fail:reject,
            })
        })
    }
    /*****
     * 封装统一请求方法
     */
    // 请求方法
    function sendRequest <REQ, RES> (o: RequestOption <REQ,RES> ,a: AuthOption) : Promise <RES> {
        //const authOpt = a || {attachAuthHeader:true}
        return new Promise((resolve,reject) => {
            const header: Record<string,any> = {}
            if (a.attachAuthHeader) {
                if (authData.token && authData.expireMs >= Date.now()) {
                    header.authorization = 'Bearer ' + authData.token
                }else {
                    // token 过期 / 无效
                    reject(AUTH_ERR)
                    return
                }
            } 
            wx.request({
                url: BASE_URL + o.url,
                method: o.method,
                data:  o.data,
                header,
                success: res => {
                    if (res.statusCode === 401) {
                        reject(AUTH_ERR)
                    } else if (res.statusCode >= 400){
                        reject(res)
                    } else {
                        resolve(o.resMarshaller(camelcaseKeys(res.data as object,{deep:true})))
                    }
                },
                fail:reject,
            })
        })
    }

    /*****
     * 封装尝试token 流程管理
     */
    export async function sendRequestWithAuthRetry <REQ, RES> (o: RequestOption <REQ,RES> ,a?: AuthOption) : Promise <RES> {
        const authOpt = a || {
            attachAuthHeader:true,
            retryOnAuthErr:true,
        }
        try {
            await login()
            return sendRequest(o,authOpt)
        } catch(err) {
            if (err === AUTH_ERR && authOpt.retryOnAuthErr) {
                authData.token = ''
                authData.expireMs = 0
                return sendRequestWithAuthRetry(o,{
                    attachAuthHeader:authOpt.attachAuthHeader,
                    retryOnAuthErr:false,
                })
            } else {
                throw err
            }
        }
    }

    // 登录请求
    export async function login() {
        // 如果token有效
        if (authData.token && authData.expireMs >= Date.now()) {
            return
        }
        const wxLoginResult = await wxLogin() 
        const reqTimeMs = Date.now()
        // 调用请求方法
        const result = await sendRequest<auth.v1.ILoginRequest,auth.v1.ILoginResponse>({
            method:'POST',
            url:'/v1/auth/login',
            data:{
                code:wxLoginResult.code
            },
            resMarshaller:auth.v1.LoginResponse.fromObject,
        },{
            attachAuthHeader:false,
            retryOnAuthErr:false,
        })
        authData.token = result.accessToken!
        authData.expireMs = reqTimeMs + result.expiresIn! * 1000
    }

    // 上传图片
    export interface UploadFileOpts {
        localPath: string
        url: string
    }
    // 
    export function uploadFile(o: UploadFileOpts):Promise<void> {
        console.log(o.url);
        
        const data = wx.getFileSystemManager().readFileSync(o.localPath)
        return new Promise((resolve,reject) => {
            wx.request({
            method:'PUT',
            url:o.url,
            data,
            success:res => {
                if (res.statusCode >= 400) {
                    reject(res)
                } else {
                    resolve()
                }
            },
            fail:reject,
          })
        })
    }
}