import bcrypt from "bcrypt";
import { IAdminRepositories } from "../../../domain/repositories/IAdminRepositories.js";
import { JwtService } from "../../../infrastructure/services/jwt.services.js";
import { BcryptService } from "../../../infrastructure/services/bcrypt.services.js";
import{APIError} from "../../../shared/errors/apiError.js";
import { HttpStatus } from "../../../shared/constanst/httpStatus.js";

export class AdminLogin{
    constructor(private adminRepositories: IAdminRepositories,
        private jwtService: JwtService,
        private bcryptService: BcryptService
    ){}
    async execute(email:string,password:string){
      const admin = await this.adminRepositories.findByUsername(email);
      if(!admin){
        throw new APIError( HttpStatus.UNAUTHORIZED,"Invalid email or password");
      }

      const isPasswordCorrect = await this.bcryptService.comparePasswords(password, admin.password);
      if(!isPasswordCorrect){
        throw new APIError( HttpStatus.UNAUTHORIZED,"Invalid email or password");
      }

      const accessToken = this.jwtService.generateAccessToken(admin.id, admin.email);

        const refreshToken = this.jwtService.generateRefreshToken(admin.id, admin.email);

        await  this.adminRepositories.updateRefreshToken(admin.id,refreshToken);

        return {accessToken,refreshToken,admin:{id:admin.id,email:admin.email}};
    }
}