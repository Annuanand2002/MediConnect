import { Types } from "mongoose";


export class Doctor{
    constructor(
        public fullName : string,
        public email : string,
        public phone : string,
        public dateOfBirth : Date,
        public department : Types.ObjectId,
        public qualification : string,
        public experience : number,
        public governmentIdNumber : string,
        public governmentIdUrl : string,
        public degreeCertificateUrl : string[],
        public medicalLicenseUrl : string,
        public doctorCode?:string,
        public password ?: string,
        public profileImage ?:string,
        public consultationFee? : number,
        public averageRating?: number,
        public totalReviews?: number,
        public isVerified ?: boolean ,
        public isBlocked ?: boolean ,
        public isProfileCompleted ?: boolean ,
        public id ?: string,
        public createdAt ?: Date,
        public updatedAt?: Date,
        public activationToken?: string|null,
        public activationTokenExpiresAt ?: Date|null,
        public refreshToken?:string|null
    ){}
}