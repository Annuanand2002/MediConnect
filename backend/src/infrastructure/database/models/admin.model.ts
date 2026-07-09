import monoose,{ Schema, Document } from "mongoose";

export interface IAdmin extends Document{
    email : string;
    password: string;
    refreshToken?: string;
}

const adminSchema = new Schema<IAdmin>({
    email: {
        type: String,   
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        default: null,
    },
},
{timestamps: true})

export const AdminModel = monoose.model<IAdmin>("Admin", adminSchema);