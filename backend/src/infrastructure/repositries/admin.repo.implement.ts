import { IAdminRepositories } from "../../domain/repositories/IAdminRepositories.js";
import { Admin } from "../../domain/entities/admin.entity.js";
import { AdminModel } from "../database/models/admin.model.js";

export class AdminRepsitoriesImplement implements IAdminRepositories {
    async findByUsername(email: string): Promise<Admin | null> {
        const admin = await AdminModel.findOne({ email });
        if(!admin) return null;
        return new Admin(admin._id.toString(), admin.email, admin.password, admin.refreshToken??undefined);
    }
    async findById(id: string): Promise<Admin | null> {
        const admin = await AdminModel.findById(id);
        if(!admin)return null;
        return new Admin(admin._id.toString(), admin.email, admin.password, admin.refreshToken??undefined);
        }
        async updateRefreshToken(id: string, refreshToken: string): Promise<void> {
            await AdminModel.findByIdAndUpdate(id, { refreshToken });
        }
        async findByRefreshToken(refreshToken: string): Promise<Admin | null> {
            return null
        }
}