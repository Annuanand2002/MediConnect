import { IAdminRepositories } from "../../../domain/repositories/IAdminRepositories.js";
import { JwtService } from "../../../infrastructure/services/jwt.services.js";
import { APIError } from "../../../shared/errors/apiError.js";
import { HttpStatus } from "../../../shared/constanst/httpStatus.js";


export class AdminRefreshTokenUseCase{
    constructor(private adminRepositories: IAdminRepositories, private jwtService: JwtService){}

    async execute(refreshToken:string){
        if(!refreshToken){
            throw new APIError(HttpStatus.UNAUTHORIZED,"Refresh token is missing");
        }

        const payload = this.jwtService.verifyRefreshToken(refreshToken)as {adminId:string,email:string};
        const admin = await this.adminRepositories.findById(payload.adminId);
        if(!admin){
            throw new APIError(HttpStatus.UNAUTHORIZED,"Admin not found");
        }
        if(admin.refreshToken !== refreshToken){
            throw new APIError(HttpStatus.UNAUTHORIZED,"Invalid refresh token");
        }
        const newAccessToken = this.jwtService.generateAccessToken(admin.id, admin.email);
        return {newAccessToken};
    }
}