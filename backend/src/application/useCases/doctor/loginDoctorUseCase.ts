import { IDoctorRepository } from "../../../domain/repositories/doctor.repository.js";
import { BcryptService } from "../../../infrastructure/services/bcrypt.services.js";
import { JwtService } from "../../../infrastructure/services/jwt.services.js";
import { HttpStatus } from "../../../shared/constanst/httpStatus.js";
import { APIError } from "../../../shared/errors/apiError.js";



export class LoginDoctorUseCase{
    constructor(private doctorRepository:IDoctorRepository,private bcryptService:BcryptService, private jwtService:JwtService){}
    async execute(email:string,password:string){
        const doctor = await this.doctorRepository.findByEmail(email);
        if(!doctor){
            throw new APIError(HttpStatus.NOT_FOUND,"Please activate your account first")
        }
        if(doctor.isBlocked){
            throw new APIError(HttpStatus.FORBIDDEN,"Your account has been blocked")
        }
        const isMatch = await this.bcryptService.comparePasswords(password,doctor.password!)
        if(!isMatch){
            throw new APIError( HttpStatus.UNAUTHORIZED,"Invalid email or password");
        }

        const accessToken = this.jwtService.generateAccessToken(doctor.id!,doctor.email)
        const refreshToken = this.jwtService.generateRefreshToken(doctor.id!,doctor.email)
        await this.doctorRepository.updateRefreshToken(doctor.id!,refreshToken)
        return {
            accessToken,refreshToken,doctor:{
                id:doctor.id,
                fullName: doctor.fullName,
                email:doctor.email,
                doctorCode : doctor.doctorCode

            }
        }
    }
}