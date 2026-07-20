import { Types } from "mongoose";

export class DoctorRequest{
    constructor(public fullName:string,
        public email : string,
        public phone : string,
        public dateOfBirth : Date,
        public specialization : string,
        public qualification : string,
        public experience : number,
        public governmentIdNumber : string,
        public governmentIdUrl : string,
        public degreeCertificateUrl : string[],
        public medicalLicenseUrl : string,
        public status : "PENDING"|"APPROVED"|"REJECTED" = "PENDING",
        public retryCount : number = 0,
        public rejectionReason?:string|null,
        public approvedAt?: Date,
        public id?:string,
        public createdAt?: Date,
        public updatedAt?: Date
    ){}
}