import {Coolcar} from "./request"
import {rental} from "./proto_gen/rental/rental_pb"


export namespace TripService {
    // 创建行程 请求
    export function CreateTrip(req: rental.v1.ICreateTripRequest): Promise<rental.v1.ITripEntity> {
        return Coolcar.sendRequestWithAuthRetry({
            method:'POST',
            url:'/v1/rental/create',
            data:req,
            resMarshaller:rental.v1.TripEntity.fromObject,
        })
    }
    // 查询行程请求
    export function GetTrip(id: string): Promise<rental.v1.ITrip> {
        return Coolcar.sendRequestWithAuthRetry({
            method:'GET',
            url: `/v1/rental/${encodeURIComponent(id)}`,
            resMarshaller:rental.v1.Trip.fromObject,
        })
    }
    // 查询行程列表
    export function GetTripList(s?: rental.v1.TripStatus): Promise<rental.v1.IGetTripListResponse> {
        let path = '/v1/rental/list'
        if (s) {
            path += `?status=${s}`
        }
        return Coolcar.sendRequestWithAuthRetry({
            method:'GET',
            url: path,
            resMarshaller:rental.v1.GetTripListResponse.fromObject,
        })
    }
    // 更新位置
    // export function updateTripPos(id:string,loc?: rental.v1.ILocation) {
    //     return updateTrip({
    //         id,
    //         current:loc,
    //     })
    // }
    // 更新行程
    export function updateTrip(r: rental.v1.IUpdateTripRequest): Promise<rental.v1.ITrip> {
        if (!r.id) {
            return Promise.reject("参数无效")
        }
        return Coolcar.sendRequestWithAuthRetry({
            method:'PUT',
            url:`/v1/rental/${encodeURIComponent(r.id)}`,
            data:r,
            resMarshaller:rental.v1.Trip.fromObject,
        })
    }
    // 结束行程
    export function finishTrip(id: string) {
        return updateTrip({
            id,
            endTrip:true,
        })
    }
}