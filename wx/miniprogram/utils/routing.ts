export namespace  routing {
    // 解锁路由参数
    export interface LockOpts {
        gun_id: string
    }
    // 解锁路由
    export function lock(o:LockOpts) {
        return `/pages/lock/lock?gun_id=${o.gun_id}`
    }
    // 审查路由参数 可选参数
    // 审查路由onload接收的参数
    export interface  RegisterOpts {
        redirect?:string
    }
    // 审查路由编码后的参数
    // index 扫码后传给register
    export interface  RegisterParam {
            redirectURL:string
    }
    // 审查路由
    export function register(p?:RegisterParam ) {
        const page = '/pages/register/register'
        if (!p) {
            return page
        }
        return `${page}?redirect=${encodeURIComponent(p.redirectURL)}`
    }
    // 驾驶页面传入参数
    export interface  DrivingOpts {
        trip_id: string
    }
    // 驾驶路由
    export function  driving(o: DrivingOpts) {
        return `/pages/driving/driving?trip_id=${o.trip_id}`
    }
    // 行程路由
    export function mytrips() {
        return '/pages/myTrips/mytrips'
    }
}