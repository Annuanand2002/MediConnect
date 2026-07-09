import jwt from "jsonwebtoken";

export class JwtService {
    generateAccessToken(adminId:string,email:string): string {
        return jwt.sign({ adminId, email }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "15m" });
    }
    generateRefreshToken(adminId:string,email:string): string {
        return jwt.sign({ adminId, email }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: "7d" });
    }
    verifyAccessToken(token: string){
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
    }
    verifyRefreshToken(token: string){
        return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!);
    }
}