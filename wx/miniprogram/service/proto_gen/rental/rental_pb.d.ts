import * as $protobuf from "protobufjs";
/** Namespace rental. */
export namespace rental {

    /** Namespace v1. */
    namespace v1 {

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
            constructor(properties?: rental.v1.ILocation);

            /** Location latitude. */
            public latitude: number;

            /** Location longitude. */
            public longitude: number;

            /**
             * Creates a Location message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Location
             */
            public static fromObject(object: { [k: string]: any }): rental.v1.Location;

            /**
             * Creates a plain object from a Location message. Also converts values to other types if specified.
             * @param message Location
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: rental.v1.Location, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Location to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a LocationStatus. */
        interface ILocationStatus {

            /** LocationStatus location */
            location?: (rental.v1.ILocation|null);

            /** LocationStatus locationName */
            locationName?: (string|null);

            /** LocationStatus kmDriven */
            kmDriven?: (number|null);

            /** LocationStatus feeCent */
            feeCent?: (number|null);

            /** LocationStatus timestampSec */
            timestampSec?: (number|null);
        }

        /** Represents a LocationStatus. */
        class LocationStatus implements ILocationStatus {

            /**
             * Constructs a new LocationStatus.
             * @param [properties] Properties to set
             */
            constructor(properties?: rental.v1.ILocationStatus);

            /** LocationStatus location. */
            public location?: (rental.v1.ILocation|null);

            /** LocationStatus locationName. */
            public locationName: string;

            /** LocationStatus kmDriven. */
            public kmDriven: number;

            /** LocationStatus feeCent. */
            public feeCent: number;

            /** LocationStatus timestampSec. */
            public timestampSec: number;

            /**
             * Creates a LocationStatus message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns LocationStatus
             */
            public static fromObject(object: { [k: string]: any }): rental.v1.LocationStatus;

            /**
             * Creates a plain object from a LocationStatus message. Also converts values to other types if specified.
             * @param message LocationStatus
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: rental.v1.LocationStatus, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this LocationStatus to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** TripStatus enum. */
        enum TripStatus {
            TS_NOT_SPECIFIED = 0,
            IN_PROGRESS = 1,
            FINISHED = 2
        }

        /** Properties of a Trip. */
        interface ITrip {

            /** Trip accountId */
            accountId?: (string|null);

            /** Trip gunId */
            gunId?: (string|null);

            /** Trip start */
            start?: (rental.v1.ILocationStatus|null);

            /** Trip current */
            current?: (rental.v1.ILocationStatus|null);

            /** Trip end */
            end?: (rental.v1.ILocationStatus|null);

            /** Trip status */
            status?: (rental.v1.TripStatus|null);

            /** Trip identityId */
            identityId?: (string|null);
        }

        /** Represents a Trip. */
        class Trip implements ITrip {

            /**
             * Constructs a new Trip.
             * @param [properties] Properties to set
             */
            constructor(properties?: rental.v1.ITrip);

            /** Trip accountId. */
            public accountId: string;

            /** Trip gunId. */
            public gunId: string;

            /** Trip start. */
            public start?: (rental.v1.ILocationStatus|null);

            /** Trip current. */
            public current?: (rental.v1.ILocationStatus|null);

            /** Trip end. */
            public end?: (rental.v1.ILocationStatus|null);

            /** Trip status. */
            public status: rental.v1.TripStatus;

            /** Trip identityId. */
            public identityId: string;

            /**
             * Creates a Trip message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Trip
             */
            public static fromObject(object: { [k: string]: any }): rental.v1.Trip;

            /**
             * Creates a plain object from a Trip message. Also converts values to other types if specified.
             * @param message Trip
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: rental.v1.Trip, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Trip to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a TripEntity. */
        interface ITripEntity {

            /** TripEntity id */
            id?: (string|null);

            /** TripEntity trip */
            trip?: (rental.v1.ITrip|null);
        }

        /** Represents a TripEntity. */
        class TripEntity implements ITripEntity {

            /**
             * Constructs a new TripEntity.
             * @param [properties] Properties to set
             */
            constructor(properties?: rental.v1.ITripEntity);

            /** TripEntity id. */
            public id: string;

            /** TripEntity trip. */
            public trip?: (rental.v1.ITrip|null);

            /**
             * Creates a TripEntity message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns TripEntity
             */
            public static fromObject(object: { [k: string]: any }): rental.v1.TripEntity;

            /**
             * Creates a plain object from a TripEntity message. Also converts values to other types if specified.
             * @param message TripEntity
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: rental.v1.TripEntity, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this TripEntity to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a CreateTripRequest. */
        interface ICreateTripRequest {

            /** CreateTripRequest start */
            start?: (rental.v1.ILocation|null);

            /** CreateTripRequest gunId */
            gunId?: (string|null);

            /** CreateTripRequest avatarUrl */
            avatarUrl?: (string|null);
        }

        /** Represents a CreateTripRequest. */
        class CreateTripRequest implements ICreateTripRequest {

            /**
             * Constructs a new CreateTripRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: rental.v1.ICreateTripRequest);

            /** CreateTripRequest start. */
            public start?: (rental.v1.ILocation|null);

            /** CreateTripRequest gunId. */
            public gunId: string;

            /** CreateTripRequest avatarUrl. */
            public avatarUrl: string;

            /**
             * Creates a CreateTripRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CreateTripRequest
             */
            public static fromObject(object: { [k: string]: any }): rental.v1.CreateTripRequest;

            /**
             * Creates a plain object from a CreateTripRequest message. Also converts values to other types if specified.
             * @param message CreateTripRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: rental.v1.CreateTripRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CreateTripRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetTripRequest. */
        interface IGetTripRequest {

            /** GetTripRequest id */
            id?: (string|null);
        }

        /** Represents a GetTripRequest. */
        class GetTripRequest implements IGetTripRequest {

            /**
             * Constructs a new GetTripRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: rental.v1.IGetTripRequest);

            /** GetTripRequest id. */
            public id: string;

            /**
             * Creates a GetTripRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetTripRequest
             */
            public static fromObject(object: { [k: string]: any }): rental.v1.GetTripRequest;

            /**
             * Creates a plain object from a GetTripRequest message. Also converts values to other types if specified.
             * @param message GetTripRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: rental.v1.GetTripRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetTripRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetTripListRequest. */
        interface IGetTripListRequest {

            /** GetTripListRequest status */
            status?: (rental.v1.TripStatus|null);
        }

        /** Represents a GetTripListRequest. */
        class GetTripListRequest implements IGetTripListRequest {

            /**
             * Constructs a new GetTripListRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: rental.v1.IGetTripListRequest);

            /** GetTripListRequest status. */
            public status: rental.v1.TripStatus;

            /**
             * Creates a GetTripListRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetTripListRequest
             */
            public static fromObject(object: { [k: string]: any }): rental.v1.GetTripListRequest;

            /**
             * Creates a plain object from a GetTripListRequest message. Also converts values to other types if specified.
             * @param message GetTripListRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: rental.v1.GetTripListRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetTripListRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetTripListResponse. */
        interface IGetTripListResponse {

            /** GetTripListResponse tripList */
            tripList?: (rental.v1.ITripEntity[]|null);
        }

        /** Represents a GetTripListResponse. */
        class GetTripListResponse implements IGetTripListResponse {

            /**
             * Constructs a new GetTripListResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: rental.v1.IGetTripListResponse);

            /** GetTripListResponse tripList. */
            public tripList: rental.v1.ITripEntity[];

            /**
             * Creates a GetTripListResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetTripListResponse
             */
            public static fromObject(object: { [k: string]: any }): rental.v1.GetTripListResponse;

            /**
             * Creates a plain object from a GetTripListResponse message. Also converts values to other types if specified.
             * @param message GetTripListResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: rental.v1.GetTripListResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetTripListResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an UpdateTripRequest. */
        interface IUpdateTripRequest {

            /** UpdateTripRequest id */
            id?: (string|null);

            /** UpdateTripRequest current */
            current?: (rental.v1.ILocationStatus|null);

            /** UpdateTripRequest endTrip */
            endTrip?: (boolean|null);
        }

        /** Represents an UpdateTripRequest. */
        class UpdateTripRequest implements IUpdateTripRequest {

            /**
             * Constructs a new UpdateTripRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: rental.v1.IUpdateTripRequest);

            /** UpdateTripRequest id. */
            public id: string;

            /** UpdateTripRequest current. */
            public current?: (rental.v1.ILocationStatus|null);

            /** UpdateTripRequest endTrip. */
            public endTrip: boolean;

            /**
             * Creates an UpdateTripRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UpdateTripRequest
             */
            public static fromObject(object: { [k: string]: any }): rental.v1.UpdateTripRequest;

            /**
             * Creates a plain object from an UpdateTripRequest message. Also converts values to other types if specified.
             * @param message UpdateTripRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: rental.v1.UpdateTripRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this UpdateTripRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Represents a TripService */
        class TripService extends $protobuf.rpc.Service {

            /**
             * Constructs a new TripService service.
             * @param rpcImpl RPC implementation
             * @param [requestDelimited=false] Whether requests are length-delimited
             * @param [responseDelimited=false] Whether responses are length-delimited
             */
            constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

            /**
             * Calls CreateTrip.
             * @param request CreateTripRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and TripEntity
             */
            public createTrip(request: rental.v1.ICreateTripRequest, callback: rental.v1.TripService.CreateTripCallback): void;

            /**
             * Calls CreateTrip.
             * @param request CreateTripRequest message or plain object
             * @returns Promise
             */
            public createTrip(request: rental.v1.ICreateTripRequest): Promise<rental.v1.TripEntity>;

            /**
             * Calls GetTrip.
             * @param request GetTripRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and Trip
             */
            public getTrip(request: rental.v1.IGetTripRequest, callback: rental.v1.TripService.GetTripCallback): void;

            /**
             * Calls GetTrip.
             * @param request GetTripRequest message or plain object
             * @returns Promise
             */
            public getTrip(request: rental.v1.IGetTripRequest): Promise<rental.v1.Trip>;

            /**
             * Calls GetTripList.
             * @param request GetTripListRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and GetTripListResponse
             */
            public getTripList(request: rental.v1.IGetTripListRequest, callback: rental.v1.TripService.GetTripListCallback): void;

            /**
             * Calls GetTripList.
             * @param request GetTripListRequest message or plain object
             * @returns Promise
             */
            public getTripList(request: rental.v1.IGetTripListRequest): Promise<rental.v1.GetTripListResponse>;

            /**
             * Calls UpdateTrip.
             * @param request UpdateTripRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and Trip
             */
            public updateTrip(request: rental.v1.IUpdateTripRequest, callback: rental.v1.TripService.UpdateTripCallback): void;

            /**
             * Calls UpdateTrip.
             * @param request UpdateTripRequest message or plain object
             * @returns Promise
             */
            public updateTrip(request: rental.v1.IUpdateTripRequest): Promise<rental.v1.Trip>;
        }

        namespace TripService {

            /**
             * Callback as used by {@link rental.v1.TripService#createTrip}.
             * @param error Error, if any
             * @param [response] TripEntity
             */
            type CreateTripCallback = (error: (Error|null), response?: rental.v1.TripEntity) => void;

            /**
             * Callback as used by {@link rental.v1.TripService#getTrip}.
             * @param error Error, if any
             * @param [response] Trip
             */
            type GetTripCallback = (error: (Error|null), response?: rental.v1.Trip) => void;

            /**
             * Callback as used by {@link rental.v1.TripService#getTripList}.
             * @param error Error, if any
             * @param [response] GetTripListResponse
             */
            type GetTripListCallback = (error: (Error|null), response?: rental.v1.GetTripListResponse) => void;

            /**
             * Callback as used by {@link rental.v1.TripService#updateTrip}.
             * @param error Error, if any
             * @param [response] Trip
             */
            type UpdateTripCallback = (error: (Error|null), response?: rental.v1.Trip) => void;
        }

        /** Gender enum. */
        enum Gender {
            G_NOT_SPECIFIED = 0,
            MALE = 1,
            FEMALE = 2
        }

        /** Properties of an Identity. */
        interface IIdentity {

            /** Identity licNumber */
            licNumber?: (string|null);

            /** Identity name */
            name?: (string|null);

            /** Identity gender */
            gender?: (rental.v1.Gender|null);

            /** Identity birthDataMillis */
            birthDataMillis?: (number|null);
        }

        /** Represents an Identity. */
        class Identity implements IIdentity {

            /**
             * Constructs a new Identity.
             * @param [properties] Properties to set
             */
            constructor(properties?: rental.v1.IIdentity);

            /** Identity licNumber. */
            public licNumber: string;

            /** Identity name. */
            public name: string;

            /** Identity gender. */
            public gender: rental.v1.Gender;

            /** Identity birthDataMillis. */
            public birthDataMillis: number;

            /**
             * Creates an Identity message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Identity
             */
            public static fromObject(object: { [k: string]: any }): rental.v1.Identity;

            /**
             * Creates a plain object from an Identity message. Also converts values to other types if specified.
             * @param message Identity
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: rental.v1.Identity, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Identity to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** IdentityStatus enum. */
        enum IdentityStatus {
            UN_SUBMITTED = 0,
            PENDING = 1,
            VERIFIED = 2
        }

        /** Properties of a Profile. */
        interface IProfile {

            /** Profile identity */
            identity?: (rental.v1.IIdentity|null);

            /** Profile identityStatus */
            identityStatus?: (rental.v1.IdentityStatus|null);
        }

        /** Represents a Profile. */
        class Profile implements IProfile {

            /**
             * Constructs a new Profile.
             * @param [properties] Properties to set
             */
            constructor(properties?: rental.v1.IProfile);

            /** Profile identity. */
            public identity?: (rental.v1.IIdentity|null);

            /** Profile identityStatus. */
            public identityStatus: rental.v1.IdentityStatus;

            /**
             * Creates a Profile message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Profile
             */
            public static fromObject(object: { [k: string]: any }): rental.v1.Profile;

            /**
             * Creates a plain object from a Profile message. Also converts values to other types if specified.
             * @param message Profile
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: rental.v1.Profile, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Profile to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetProfileRequest. */
        interface IGetProfileRequest {
        }

        /** Represents a GetProfileRequest. */
        class GetProfileRequest implements IGetProfileRequest {

            /**
             * Constructs a new GetProfileRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: rental.v1.IGetProfileRequest);

            /**
             * Creates a GetProfileRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetProfileRequest
             */
            public static fromObject(object: { [k: string]: any }): rental.v1.GetProfileRequest;

            /**
             * Creates a plain object from a GetProfileRequest message. Also converts values to other types if specified.
             * @param message GetProfileRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: rental.v1.GetProfileRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetProfileRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ClearProfileRequest. */
        interface IClearProfileRequest {
        }

        /** Represents a ClearProfileRequest. */
        class ClearProfileRequest implements IClearProfileRequest {

            /**
             * Constructs a new ClearProfileRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: rental.v1.IClearProfileRequest);

            /**
             * Creates a ClearProfileRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ClearProfileRequest
             */
            public static fromObject(object: { [k: string]: any }): rental.v1.ClearProfileRequest;

            /**
             * Creates a plain object from a ClearProfileRequest message. Also converts values to other types if specified.
             * @param message ClearProfileRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: rental.v1.ClearProfileRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ClearProfileRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetProfilePhotoRequest. */
        interface IGetProfilePhotoRequest {
        }

        /** Represents a GetProfilePhotoRequest. */
        class GetProfilePhotoRequest implements IGetProfilePhotoRequest {

            /**
             * Constructs a new GetProfilePhotoRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: rental.v1.IGetProfilePhotoRequest);

            /**
             * Creates a GetProfilePhotoRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetProfilePhotoRequest
             */
            public static fromObject(object: { [k: string]: any }): rental.v1.GetProfilePhotoRequest;

            /**
             * Creates a plain object from a GetProfilePhotoRequest message. Also converts values to other types if specified.
             * @param message GetProfilePhotoRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: rental.v1.GetProfilePhotoRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetProfilePhotoRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetProfilePhotoResponse. */
        interface IGetProfilePhotoResponse {

            /** GetProfilePhotoResponse url */
            url?: (string|null);
        }

        /** Represents a GetProfilePhotoResponse. */
        class GetProfilePhotoResponse implements IGetProfilePhotoResponse {

            /**
             * Constructs a new GetProfilePhotoResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: rental.v1.IGetProfilePhotoResponse);

            /** GetProfilePhotoResponse url. */
            public url: string;

            /**
             * Creates a GetProfilePhotoResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetProfilePhotoResponse
             */
            public static fromObject(object: { [k: string]: any }): rental.v1.GetProfilePhotoResponse;

            /**
             * Creates a plain object from a GetProfilePhotoResponse message. Also converts values to other types if specified.
             * @param message GetProfilePhotoResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: rental.v1.GetProfilePhotoResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetProfilePhotoResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a CreateProfileRequest. */
        interface ICreateProfileRequest {
        }

        /** Represents a CreateProfileRequest. */
        class CreateProfileRequest implements ICreateProfileRequest {

            /**
             * Constructs a new CreateProfileRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: rental.v1.ICreateProfileRequest);

            /**
             * Creates a CreateProfileRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CreateProfileRequest
             */
            public static fromObject(object: { [k: string]: any }): rental.v1.CreateProfileRequest;

            /**
             * Creates a plain object from a CreateProfileRequest message. Also converts values to other types if specified.
             * @param message CreateProfileRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: rental.v1.CreateProfileRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CreateProfileRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a CreateProfilePhotoResponse. */
        interface ICreateProfilePhotoResponse {

            /** CreateProfilePhotoResponse uploadUrl */
            uploadUrl?: (string|null);
        }

        /** Represents a CreateProfilePhotoResponse. */
        class CreateProfilePhotoResponse implements ICreateProfilePhotoResponse {

            /**
             * Constructs a new CreateProfilePhotoResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: rental.v1.ICreateProfilePhotoResponse);

            /** CreateProfilePhotoResponse uploadUrl. */
            public uploadUrl: string;

            /**
             * Creates a CreateProfilePhotoResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CreateProfilePhotoResponse
             */
            public static fromObject(object: { [k: string]: any }): rental.v1.CreateProfilePhotoResponse;

            /**
             * Creates a plain object from a CreateProfilePhotoResponse message. Also converts values to other types if specified.
             * @param message CreateProfilePhotoResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: rental.v1.CreateProfilePhotoResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CreateProfilePhotoResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a CompleteProfileRequest. */
        interface ICompleteProfileRequest {
        }

        /** Represents a CompleteProfileRequest. */
        class CompleteProfileRequest implements ICompleteProfileRequest {

            /**
             * Constructs a new CompleteProfileRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: rental.v1.ICompleteProfileRequest);

            /**
             * Creates a CompleteProfileRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CompleteProfileRequest
             */
            public static fromObject(object: { [k: string]: any }): rental.v1.CompleteProfileRequest;

            /**
             * Creates a plain object from a CompleteProfileRequest message. Also converts values to other types if specified.
             * @param message CompleteProfileRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: rental.v1.CompleteProfileRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CompleteProfileRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ClearProfilePhotoRequest. */
        interface IClearProfilePhotoRequest {
        }

        /** Represents a ClearProfilePhotoRequest. */
        class ClearProfilePhotoRequest implements IClearProfilePhotoRequest {

            /**
             * Constructs a new ClearProfilePhotoRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: rental.v1.IClearProfilePhotoRequest);

            /**
             * Creates a ClearProfilePhotoRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ClearProfilePhotoRequest
             */
            public static fromObject(object: { [k: string]: any }): rental.v1.ClearProfilePhotoRequest;

            /**
             * Creates a plain object from a ClearProfilePhotoRequest message. Also converts values to other types if specified.
             * @param message ClearProfilePhotoRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: rental.v1.ClearProfilePhotoRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ClearProfilePhotoRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ClearProfilePhotoResponse. */
        interface IClearProfilePhotoResponse {
        }

        /** Represents a ClearProfilePhotoResponse. */
        class ClearProfilePhotoResponse implements IClearProfilePhotoResponse {

            /**
             * Constructs a new ClearProfilePhotoResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: rental.v1.IClearProfilePhotoResponse);

            /**
             * Creates a ClearProfilePhotoResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ClearProfilePhotoResponse
             */
            public static fromObject(object: { [k: string]: any }): rental.v1.ClearProfilePhotoResponse;

            /**
             * Creates a plain object from a ClearProfilePhotoResponse message. Also converts values to other types if specified.
             * @param message ClearProfilePhotoResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: rental.v1.ClearProfilePhotoResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ClearProfilePhotoResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Represents a ProfileService */
        class ProfileService extends $protobuf.rpc.Service {

            /**
             * Constructs a new ProfileService service.
             * @param rpcImpl RPC implementation
             * @param [requestDelimited=false] Whether requests are length-delimited
             * @param [responseDelimited=false] Whether responses are length-delimited
             */
            constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

            /**
             * Calls GetProfile.
             * @param request GetProfileRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and Profile
             */
            public getProfile(request: rental.v1.IGetProfileRequest, callback: rental.v1.ProfileService.GetProfileCallback): void;

            /**
             * Calls GetProfile.
             * @param request GetProfileRequest message or plain object
             * @returns Promise
             */
            public getProfile(request: rental.v1.IGetProfileRequest): Promise<rental.v1.Profile>;

            /**
             * Calls SubmitProfile.
             * @param request Identity message or plain object
             * @param callback Node-style callback called with the error, if any, and Profile
             */
            public submitProfile(request: rental.v1.IIdentity, callback: rental.v1.ProfileService.SubmitProfileCallback): void;

            /**
             * Calls SubmitProfile.
             * @param request Identity message or plain object
             * @returns Promise
             */
            public submitProfile(request: rental.v1.IIdentity): Promise<rental.v1.Profile>;

            /**
             * Calls ClearProfile.
             * @param request ClearProfileRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and Profile
             */
            public clearProfile(request: rental.v1.IClearProfileRequest, callback: rental.v1.ProfileService.ClearProfileCallback): void;

            /**
             * Calls ClearProfile.
             * @param request ClearProfileRequest message or plain object
             * @returns Promise
             */
            public clearProfile(request: rental.v1.IClearProfileRequest): Promise<rental.v1.Profile>;

            /**
             * Calls GetProfilePhoto.
             * @param request GetProfilePhotoRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and GetProfilePhotoResponse
             */
            public getProfilePhoto(request: rental.v1.IGetProfilePhotoRequest, callback: rental.v1.ProfileService.GetProfilePhotoCallback): void;

            /**
             * Calls GetProfilePhoto.
             * @param request GetProfilePhotoRequest message or plain object
             * @returns Promise
             */
            public getProfilePhoto(request: rental.v1.IGetProfilePhotoRequest): Promise<rental.v1.GetProfilePhotoResponse>;

            /**
             * Calls CreateProfilePhoto.
             * @param request CreateProfileRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and CreateProfilePhotoResponse
             */
            public createProfilePhoto(request: rental.v1.ICreateProfileRequest, callback: rental.v1.ProfileService.CreateProfilePhotoCallback): void;

            /**
             * Calls CreateProfilePhoto.
             * @param request CreateProfileRequest message or plain object
             * @returns Promise
             */
            public createProfilePhoto(request: rental.v1.ICreateProfileRequest): Promise<rental.v1.CreateProfilePhotoResponse>;

            /**
             * Calls CompleteProfilePhoto.
             * @param request CompleteProfileRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and Identity
             */
            public completeProfilePhoto(request: rental.v1.ICompleteProfileRequest, callback: rental.v1.ProfileService.CompleteProfilePhotoCallback): void;

            /**
             * Calls CompleteProfilePhoto.
             * @param request CompleteProfileRequest message or plain object
             * @returns Promise
             */
            public completeProfilePhoto(request: rental.v1.ICompleteProfileRequest): Promise<rental.v1.Identity>;

            /**
             * Calls ClearProfilePhoto.
             * @param request ClearProfilePhotoRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and ClearProfilePhotoResponse
             */
            public clearProfilePhoto(request: rental.v1.IClearProfilePhotoRequest, callback: rental.v1.ProfileService.ClearProfilePhotoCallback): void;

            /**
             * Calls ClearProfilePhoto.
             * @param request ClearProfilePhotoRequest message or plain object
             * @returns Promise
             */
            public clearProfilePhoto(request: rental.v1.IClearProfilePhotoRequest): Promise<rental.v1.ClearProfilePhotoResponse>;
        }

        namespace ProfileService {

            /**
             * Callback as used by {@link rental.v1.ProfileService#getProfile}.
             * @param error Error, if any
             * @param [response] Profile
             */
            type GetProfileCallback = (error: (Error|null), response?: rental.v1.Profile) => void;

            /**
             * Callback as used by {@link rental.v1.ProfileService#submitProfile}.
             * @param error Error, if any
             * @param [response] Profile
             */
            type SubmitProfileCallback = (error: (Error|null), response?: rental.v1.Profile) => void;

            /**
             * Callback as used by {@link rental.v1.ProfileService#clearProfile}.
             * @param error Error, if any
             * @param [response] Profile
             */
            type ClearProfileCallback = (error: (Error|null), response?: rental.v1.Profile) => void;

            /**
             * Callback as used by {@link rental.v1.ProfileService#getProfilePhoto}.
             * @param error Error, if any
             * @param [response] GetProfilePhotoResponse
             */
            type GetProfilePhotoCallback = (error: (Error|null), response?: rental.v1.GetProfilePhotoResponse) => void;

            /**
             * Callback as used by {@link rental.v1.ProfileService#createProfilePhoto}.
             * @param error Error, if any
             * @param [response] CreateProfilePhotoResponse
             */
            type CreateProfilePhotoCallback = (error: (Error|null), response?: rental.v1.CreateProfilePhotoResponse) => void;

            /**
             * Callback as used by {@link rental.v1.ProfileService#completeProfilePhoto}.
             * @param error Error, if any
             * @param [response] Identity
             */
            type CompleteProfilePhotoCallback = (error: (Error|null), response?: rental.v1.Identity) => void;

            /**
             * Callback as used by {@link rental.v1.ProfileService#clearProfilePhoto}.
             * @param error Error, if any
             * @param [response] ClearProfilePhotoResponse
             */
            type ClearProfilePhotoCallback = (error: (Error|null), response?: rental.v1.ClearProfilePhotoResponse) => void;
        }
    }
}
