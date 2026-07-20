import { Schema,model } from "mongoose";





const departmentSchema = new Schema({
    name : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    description : {
        type : String,
        default : ""
    },
    isActive : {
        type : Boolean,
        default : true
    }
},
{timestamps:true}
)


export default model("Department",departmentSchema)