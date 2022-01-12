import camelcaseKeys from "camelcase-keys";
import { gun } from "./proto_gen/gun/gun_pb";
import { Coolcar } from "./request";

export namespace GunService {
    export function subscribe(onMsg: (c: gun.v1.IGunEntity) => void) {
        const socket = wx.connectSocket({
            url:Coolcar.WS_ADDR + '/ws'
        })
        socket.onMessage(msg => {
            const obj = JSON.parse(msg.data as string)
            onMsg(gun.v1.GunEntity.fromObject(
                camelcaseKeys(obj,{
                    deep:true,
                })
            ))
        })
        return socket
    }

    export function getGun(id: string): Promise<gun.v1.IGun> {
        return Coolcar.sendRequestWithAuthRetry({
            method:'GET',
            url:`/v1/gun/${encodeURIComponent(id)}`,
            resMarshaller:gun.v1.Gun.fromObject,
        })
    }
}