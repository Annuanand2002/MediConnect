import { IAdminRepositories } from "../../../domain/repositories/IAdminRepositories.js";
import { JwtService } from "../../../infrastructure/services/jwt.services.js";
import { APIError } from "../../../shared/errors/apiError.js";
import { HttpStatus } from "../../../shared/constanst/httpStatus.js";

export class AdminLogoutUseCase {
    constructor(private adminRepository: IAdminRepositories,private jwtService :JwtService) {}

    async execute(refreshToken: string):Promise<void> {
        if (!refreshToken) {
            throw new APIError(HttpStatus.UNAUTHORIZED, "Refresh token is missing");
        }
        const payload = this.jwtService.verifyRefreshToken(refreshToken) as { adminId: string, email: string };
        const admin = await this.adminRepository.findById(payload.adminId);
        if(!admin){
            throw new APIError(HttpStatus.UNAUTHORIZED, "Admin not found");
        }
        await this.adminRepository.updateRefreshToken(admin.id,null);
    }
}