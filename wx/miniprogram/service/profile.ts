import { rental } from "./proto_gen/rental/rental_pb";
import { Coolcar } from "./request";

export namespace ProfileService {
    export function getProfile(): Promise<rental.v1.IProfile> {
        return Coolcar.sendRequestWithAuthRetry({
            method:'GET',
            url:'/v1/profile',
            resMarshaller:rental.v1.Profile.fromObject,
        })
    } 

    export function submitProfile(req: rental.v1.IIdentity): Promise<rental.v1.IProfile> {
        return Coolcar.sendRequestWithAuthRetry({
            method:'POST',
            url:'/v1/profile',
            data:req,
            resMarshaller:rental.v1.Profile.fromObject,
        })
    }

    export function clearProfile(): Promise<rental.v1.IProfile> {
        return Coolcar.sendRequestWithAuthRetry({
            method:'DELETE',
            url:'/v1/profile',
            resMarshaller:rental.v1.Profile.fromObject,
        })
    }

    export function getProfilePhoto():Promise<rental.v1.IGetProfilePhotoResponse> {
        return Coolcar.sendRequestWithAuthRetry({
            method:'GET',
            url:'/v1/profile/photo',
            resMarshaller:rental.v1.GetProfilePhotoResponse.fromObject,
        })
    }

    export function createProfilePhoto():Promise<rental.v1.ICreateProfilePhotoResponse> {
        return Coolcar.sendRequestWithAuthRetry({
            method:'POST',
            url:'/v1/profile/photo',
            resMarshaller:rental.v1.CreateProfilePhotoResponse.fromObject,
        })
    }

    export function completeProfilePhoto():Promise<rental.v1.IIdentity> {
        return Coolcar.sendRequestWithAuthRetry({
            method:'POST',
            url:'/v1/profile/photo/complete',
            resMarshaller:rental.v1.Identity.fromObject,
        })
    }

    export function clearProfilePhoto(): Promise<rental.v1.IClearProfilePhotoRequest> {
        return Coolcar.sendRequestWithAuthRetry({
            method:'DELETE',
            url:'/v1/profile/photo',
            resMarshaller:rental.v1.ClearProfilePhotoResponse.fromObject
        })
    }
}