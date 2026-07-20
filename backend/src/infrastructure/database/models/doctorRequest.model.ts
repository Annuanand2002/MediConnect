import { Schema, model } from "mongoose";



const doctorRequestSchema = new Schema({
    fullName: {
        type :String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    phone : {
        type : String,
        required : true
    },
    dateOfBirth : {
        type : Date,
        required : true
    },
    specialization : {
        type : String,
        required : true
    },
    qualification : {
        type : String,
        required : true
    },
    experience : {
        type : Number,
        required : true
    },
    governmentIdNumber : {
        type : String,
        required : true
    },
    governmentIdUrl : {
        type : String,
        required : true
    },
    degreeCertificateUrl : [{
        type : String,
        required : true
    }],
    medicalLicenseUrl : {
        type : String,
        required : true
    },
    status : {
        type : String,
        enum : ["PENDING","APPROVED","REJECTED"],
        default : "PENDING"
    },
    retryCount : {
        type : Number,
        default: 0
    },
    rejectionReason : String,
    approvedAt : Date,
},
{timestamps : true}
)


export default model("DoctorRequest",doctorRequestSchema)