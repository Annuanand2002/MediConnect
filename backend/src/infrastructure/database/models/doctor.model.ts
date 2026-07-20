import { Schema, model} from "mongoose";




const doctorSchema = new Schema({
    fullName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique: true,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    dateOfBirth : {
        type : Date,
        required : true
    },
    department : {
        type : Schema.Types.ObjectId,
        ref : "Department",
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
    degreeCertificateUrl : [
        {
            type : String,
            required : true
        }
    ],
    medicalLicenseUrl : {
        type : String,
        required : true
    },
    doctorCode : {
        type : String,
        unique : true,
        sparse : true
    },
    password : {
        type : String
    },
    profileImage : {
        type : String,
        default : ""
    },
    consultationFee : {
        type : Number,
        default : 0
    },
    averageRating : {
        type : Number,
        default : 0
    },
    totalReviews : {
        type : Number,
        default : 0
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    isBlocked : {
        type : Boolean,
        default : false
    },
    isProfileCompleted : {
        type : Boolean,
        default : false
    },
    activationToken : {
        type : String,
        default : null
    },
    activationTokenExpiresAt : {
        type : Date,
        default : null
    },
    refreshToken : {
        type : String,
        default : null
    }
},
{
    timestamps : true
})


doctorSchema.index({department : 1})
doctorSchema.index ({isVerified:1})
doctorSchema.index({isBlocked : 1})

export default model("Doctor",doctorSchema)
