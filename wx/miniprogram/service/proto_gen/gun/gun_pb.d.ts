import * as $protobuf from "protobufjs";
/** Namespace gun. */
export namespace gun {

    /** Namespace v1. */
    namespace v1 {

        /** Properties of a GunEntity. */
        interface IGunEntity {

            /** GunEntity id */
            id?: (string|null);

            /** GunEntity gun */
            gun?: (gun.v1.IGun|null);
        }

        /** Represents a GunEntity. */
        class GunEntity implements IGunEntity {

            /**
             * Constructs a new GunEntity.
             * @param [properties] Properties to set
             */
            constructor(properties?: gun.v1.IGunEntity);

            /** GunEntity id. */
            public id: string;

            /** GunEntity gun. */
            public gun?: (gun.v1.IGun|null);

            /**
             * Creates a GunEntity message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GunEntity
             */
            public static fromObject(object: { [k: string]: any }): gun.v1.GunEntity;

            /**
             * Creates a plain object from a GunEntity message. Also converts values to other types if specified.
             * @param message GunEntity
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gun.v1.GunEntity, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GunEntity to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** GunStatus enum. */
        enum GunStatus {
            GS_NO_SPECIFIED = 0,
            LOCKED = 1,
            UNLOCKING = 2,
            UNLOCKED = 3,
            LOCKING = 4
        }

        /** Properties of a Location. */
        interface ILocation {

            /** Location latitude */
            latitude?: (number|null);

            /** Location longitude */
            longitude?: (number|null);
        }

        /** Represents a Location. */
        class Location implements ILocation {

            /**
             * Constructs a new Location.
             * @param [properties] Properties to set
             */
            constructor(properties?: gun.v1.ILocation);

            /** Location latitude. */
            public latitude: number;

            /** Location longitude. */
            public longitude: number;

            /**
             * Creates a Location message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Location
             */
            public static fromObject(object: { [k: string]: any }): gun.v1.Location;

            /**
             * Creates a plain object from a Location message. Also converts values to other types if specified.
             * @param message Location
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gun.v1.Location, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Location to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a Driver. */
        interface IDriver {

            /** Driver id */
            id?: (string|null);

            /** Driver avatarUrl */
            avatarUrl?: (string|null);
        }

        /** Represents a Driver. */
        class Driver implements IDriver {

            /**
             * Constructs a new Driver.
             * @param [properties] Properties to set
             */
            constructor(properties?: gun.v1.IDriver);

            /** Driver id. */
            public id: string;

            /** Driver avatarUrl. */
            public avatarUrl: string;

            /**
             * Creates a Driver message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Driver
             */
            public static fromObject(object: { [k: string]: any }): gun.v1.Driver;

            /**
             * Creates a plain object from a Driver message. Also converts values to other types if specified.
             * @param message Driver
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gun.v1.Driver, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Driver to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a Gun. */
        interface IGun {

            /** Gun status */
            status?: (gun.v1.GunStatus|null);

            /** Gun driver */
            driver?: (gun.v1.IDriver|null);

            /** Gun position */
            position?: (gun.v1.ILocation|null);

            /** Gun tripId */
            tripId?: (string|null);

            /** Gun type */
            type?: (string|null);

            /** Gun class */
            "class"?: (string|null);

            /** Gun cardid */
            cardid?: (string|null);
        }

        /** Represents a Gun. */
        class Gun implements IGun {

            /**
             * Constructs a new Gun.
             * @param [properties] Properties to set
             */
            constructor(properties?: gun.v1.IGun);

            /** Gun status. */
            public status: gun.v1.GunStatus;

            /** Gun driver. */
            public driver?: (gun.v1.IDriver|null);

            /** Gun position. */
            public position?: (gun.v1.ILocation|null);

            /** Gun tripId. */
            public tripId: string;

            /** Gun type. */
            public type: string;

            /** Gun class. */
            public class: string;

            /** Gun cardid. */
            public cardid: string;

            /**
             * Creates a Gun message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Gun
             */
            public static fromObject(object: { [k: string]: any }): gun.v1.Gun;

            /**
             * Creates a plain object from a Gun message. Also converts values to other types if specified.
             * @param message Gun
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gun.v1.Gun, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Gun to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a CreateGunRequest. */
        interface ICreateGunRequest {

            /** CreateGunRequest type */
            type?: (string|null);

            /** CreateGunRequest class */
            "class"?: (string|null);

            /** CreateGunRequest cardId */
            cardId?: (string|null);

            /** CreateGunRequest position */
            position?: (gun.v1.ILocation|null);
        }

        /** Represents a CreateGunRequest. */
        class CreateGunRequest implements ICreateGunRequest {

            /**
             * Constructs a new CreateGunRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: gun.v1.ICreateGunRequest);

            /** CreateGunRequest type. */
            public type: string;

            /** CreateGunRequest class. */
            public class: string;

            /** CreateGunRequest cardId. */
            public cardId: string;

            /** CreateGunRequest position. */
            public position?: (gun.v1.ILocation|null);

            /**
             * Creates a CreateGunRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CreateGunRequest
             */
            public static fromObject(object: { [k: string]: any }): gun.v1.CreateGunRequest;

            /**
             * Creates a plain object from a CreateGunRequest message. Also converts values to other types if specified.
             * @param message CreateGunRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gun.v1.CreateGunRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CreateGunRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetGunRequest. */
        interface IGetGunRequest {

            /** GetGunRequest id */
            id?: (string|null);
        }

        /** Represents a GetGunRequest. */
        class GetGunRequest implements IGetGunRequest {

            /**
             * Constructs a new GetGunRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: gun.v1.IGetGunRequest);

            /** GetGunRequest id. */
            public id: string;

            /**
             * Creates a GetGunRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetGunRequest
             */
            public static fromObject(object: { [k: string]: any }): gun.v1.GetGunRequest;

            /**
             * Creates a plain object from a GetGunRequest message. Also converts values to other types if specified.
             * @param message GetGunRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gun.v1.GetGunRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetGunRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetGunListRequest. */
        interface IGetGunListRequest {

            /** GetGunListRequest status */
            status?: (gun.v1.GunStatus|null);
        }

        /** Represents a GetGunListRequest. */
        class GetGunListRequest implements IGetGunListRequest {

            /**
             * Constructs a new GetGunListRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: gun.v1.IGetGunListRequest);

            /** GetGunListRequest status. */
            public status: gun.v1.GunStatus;

            /**
             * Creates a GetGunListRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetGunListRequest
             */
            public static fromObject(object: { [k: string]: any }): gun.v1.GetGunListRequest;

            /**
             * Creates a plain object from a GetGunListRequest message. Also converts values to other types if specified.
             * @param message GetGunListRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gun.v1.GetGunListRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetGunListRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetGunListResponse. */
        interface IGetGunListResponse {

            /** GetGunListResponse GunList */
            GunList?: (gun.v1.IGunEntity[]|null);
        }

        /** Represents a GetGunListResponse. */
        class GetGunListResponse implements IGetGunListResponse {

            /**
             * Constructs a new GetGunListResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: gun.v1.IGetGunListResponse);

            /** GetGunListResponse GunList. */
            public GunList: gun.v1.IGunEntity[];

            /**
             * Creates a GetGunListResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetGunListResponse
             */
            public static fromObject(object: { [k: string]: any }): gun.v1.GetGunListResponse;

            /**
             * Creates a plain object from a GetGunListResponse message. Also converts values to other types if specified.
             * @param message GetGunListResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gun.v1.GetGunListResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetGunListResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a LockGunRequest. */
        interface ILockGunRequest {

            /** LockGunRequest id */
            id?: (string|null);
        }

        /** Represents a LockGunRequest. */
        class LockGunRequest implements ILockGunRequest {

            /**
             * Constructs a new LockGunRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: gun.v1.ILockGunRequest);

            /** LockGunRequest id. */
            public id: string;

            /**
             * Creates a LockGunRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns LockGunRequest
             */
            public static fromObject(object: { [k: string]: any }): gun.v1.LockGunRequest;

            /**
             * Creates a plain object from a LockGunRequest message. Also converts values to other types if specified.
             * @param message LockGunRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gun.v1.LockGunRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this LockGunRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a LockGunResponse. */
        interface ILockGunResponse {
        }

        /** Represents a LockGunResponse. */
        class LockGunResponse implements ILockGunResponse {

            /**
             * Constructs a new LockGunResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: gun.v1.ILockGunResponse);

            /**
             * Creates a LockGunResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns LockGunResponse
             */
            public static fromObject(object: { [k: string]: any }): gun.v1.LockGunResponse;

            /**
             * Creates a plain object from a LockGunResponse message. Also converts values to other types if specified.
             * @param message LockGunResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gun.v1.LockGunResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this LockGunResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an UnlockGunRequest. */
        interface IUnlockGunRequest {

            /** UnlockGunRequest id */
            id?: (string|null);

            /** UnlockGunRequest driver */
            driver?: (gun.v1.IDriver|null);

            /** UnlockGunRequest tripId */
            tripId?: (string|null);
        }

        /** Represents an UnlockGunRequest. */
        class UnlockGunRequest implements IUnlockGunRequest {

            /**
             * Constructs a new UnlockGunRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: gun.v1.IUnlockGunRequest);

            /** UnlockGunRequest id. */
            public id: string;

            /** UnlockGunRequest driver. */
            public driver?: (gun.v1.IDriver|null);

            /** UnlockGunRequest tripId. */
            public tripId: string;

            /**
             * Creates an UnlockGunRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UnlockGunRequest
             */
            public static fromObject(object: { [k: string]: any }): gun.v1.UnlockGunRequest;

            /**
             * Creates a plain object from an UnlockGunRequest message. Also converts values to other types if specified.
             * @param message UnlockGunRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gun.v1.UnlockGunRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this UnlockGunRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an UnlockGunResponse. */
        interface IUnlockGunResponse {
        }

        /** Represents an UnlockGunResponse. */
        class UnlockGunResponse implements IUnlockGunResponse {

            /**
             * Constructs a new UnlockGunResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: gun.v1.IUnlockGunResponse);

            /**
             * Creates an UnlockGunResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UnlockGunResponse
             */
            public static fromObject(object: { [k: string]: any }): gun.v1.UnlockGunResponse;

            /**
             * Creates a plain object from an UnlockGunResponse message. Also converts values to other types if specified.
             * @param message UnlockGunResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gun.v1.UnlockGunResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this UnlockGunResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an UpdateGunRequest. */
        interface IUpdateGunRequest {

            /** UpdateGunRequest id */
            id?: (string|null);

            /** UpdateGunRequest status */
            status?: (gun.v1.GunStatus|null);

            /** UpdateGunRequest position */
            position?: (gun.v1.ILocation|null);
        }

        /** Represents an UpdateGunRequest. */
        class UpdateGunRequest implements IUpdateGunRequest {

            /**
             * Constructs a new UpdateGunRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: gun.v1.IUpdateGunRequest);

            /** UpdateGunRequest id. */
            public id: string;

            /** UpdateGunRequest status. */
            public status: gun.v1.GunStatus;

            /** UpdateGunRequest position. */
            public position?: (gun.v1.ILocation|null);

            /**
             * Creates an UpdateGunRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UpdateGunRequest
             */
            public static fromObject(object: { [k: string]: any }): gun.v1.UpdateGunRequest;

            /**
             * Creates a plain object from an UpdateGunRequest message. Also converts values to other types if specified.
             * @param message UpdateGunRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gun.v1.UpdateGunRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this UpdateGunRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an UpdateGunResponse. */
        interface IUpdateGunResponse {
        }

        /** Represents an UpdateGunResponse. */
        class UpdateGunResponse implements IUpdateGunResponse {

            /**
             * Constructs a new UpdateGunResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: gun.v1.IUpdateGunResponse);

            /**
             * Creates an UpdateGunResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UpdateGunResponse
             */
            public static fromObject(object: { [k: string]: any }): gun.v1.UpdateGunResponse;

            /**
             * Creates a plain object from an UpdateGunResponse message. Also converts values to other types if specified.
             * @param message UpdateGunResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: gun.v1.UpdateGunResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this UpdateGunResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Represents a GunService */
        class GunService extends $protobuf.rpc.Service {

            /**
             * Constructs a new GunService service.
             * @param rpcImpl RPC implementation
             * @param [requestDelimited=false] Whether requests are length-delimited
             * @param [responseDelimited=false] Whether responses are length-delimited
             */
            constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

            /**
             * Calls CreateGun.
             * @param request CreateGunRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and GunEntity
             */
            public createGun(request: gun.v1.ICreateGunRequest, callback: gun.v1.GunService.CreateGunCallback): void;

            /**
             * Calls CreateGun.
             * @param request CreateGunRequest message or plain object
             * @returns Promise
             */
            public createGun(request: gun.v1.ICreateGunRequest): Promise<gun.v1.GunEntity>;

            /**
             * Calls GetGun.
             * @param request GetGunRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and Gun
             */
            public getGun(request: gun.v1.IGetGunRequest, callback: gun.v1.GunService.GetGunCallback): void;

            /**
             * Calls GetGun.
             * @param request GetGunRequest message or plain object
             * @returns Promise
             */
            public getGun(request: gun.v1.IGetGunRequest): Promise<gun.v1.Gun>;

            /**
             * Calls GetGunList.
             * @param request GetGunListRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and GetGunListResponse
             */
            public getGunList(request: gun.v1.IGetGunListRequest, callback: gun.v1.GunService.GetGunListCallback): void;

            /**
             * Calls GetGunList.
             * @param request GetGunListRequest message or plain object
             * @returns Promise
             */
            public getGunList(request: gun.v1.IGetGunListRequest): Promise<gun.v1.GetGunListResponse>;

            /**
             * Calls LockGun.
             * @param request LockGunRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and LockGunResponse
             */
            public lockGun(request: gun.v1.ILockGunRequest, callback: gun.v1.GunService.LockGunCallback): void;

            /**
             * Calls LockGun.
             * @param request LockGunRequest message or plain object
             * @returns Promise
             */
            public lockGun(request: gun.v1.ILockGunRequest): Promise<gun.v1.LockGunResponse>;

            /**
             * Calls UnlockGun.
             * @param request UnlockGunRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and UnlockGunResponse
             */
            public unlockGun(request: gun.v1.IUnlockGunRequest, callback: gun.v1.GunService.UnlockGunCallback): void;

            /**
             * Calls UnlockGun.
             * @param request UnlockGunRequest message or plain object
             * @returns Promise
             */
            public unlockGun(request: gun.v1.IUnlockGunRequest): Promise<gun.v1.UnlockGunResponse>;

            /**
             * Calls UpdateGun.
             * @param request UpdateGunRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and UpdateGunResponse
             */
            public updateGun(request: gun.v1.IUpdateGunRequest, callback: gun.v1.GunService.UpdateGunCallback): void;

            /**
             * Calls UpdateGun.
             * @param request UpdateGunRequest message or plain object
             * @returns Promise
             */
            public updateGun(request: gun.v1.IUpdateGunRequest): Promise<gun.v1.UpdateGunResponse>;
        }

        namespace GunService {

            /**
             * Callback as used by {@link gun.v1.GunService#createGun}.
             * @param error Error, if any
             * @param [response] GunEntity
             */
            type CreateGunCallback = (error: (Error|null), response?: gun.v1.GunEntity) => void;

            /**
             * Callback as used by {@link gun.v1.GunService#getGun}.
             * @param error Error, if any
             * @param [response] Gun
             */
            type GetGunCallback = (error: (Error|null), response?: gun.v1.Gun) => void;

            /**
             * Callback as used by {@link gun.v1.GunService#getGunList}.
             * @param error Error, if any
             * @param [response] GetGunListResponse
             */
            type GetGunListCallback = (error: (Error|null), response?: gun.v1.GetGunListResponse) => void;

            /**
             * Callback as used by {@link gun.v1.GunService#lockGun}.
             * @param error Error, if any
             * @param [response] LockGunResponse
             */
            type LockGunCallback = (error: (Error|null), response?: gun.v1.LockGunResponse) => void;

            /**
             * Callback as used by {@link gun.v1.GunService#unlockGun}.
             * @param error Error, if any
             * @param [response] UnlockGunResponse
             */
            type UnlockGunCallback = (error: (Error|null), response?: gun.v1.UnlockGunResponse) => void;

            /**
             * Callback as used by {@link gun.v1.GunService#updateGun}.
             * @param error Error, if any
             * @param [response] UpdateGunResponse
             */
            type UpdateGunCallback = (error: (Error|null), response?: gun.v1.UpdateGunResponse) => void;
        }
    }
}
