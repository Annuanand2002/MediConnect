import {Admin} from "../entities/admin.entity.js";

export interface IAdminRepositories {
    findByUsername(email: string): Promise<Admin | null>;
    findById(id: string): Promise<Admin | null>;
    updateRefreshToken(id: string, refreshToken: string|null): Promise<void>;
    findByRefreshToken(refreshToken: string|null): Promise<Admin | null>;
}