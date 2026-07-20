import { AdminController } from "../../interfaces/controllers/admin/admin.controller.js";
import { AdminLogin } from "../../application/useCases/admin/admin.login.js";
import { AdminRepsitoriesImplement } from "../../infrastructure/repositries/admin.repo.implement.js";
import { JwtService } from "../../infrastructure/services/jwt.services.js";
import { BcryptService } from "../../infrastructure/services/bcrypt.services.js";
import { AdminRefreshTokenUseCase } from "../../application/useCases/admin/admin.refreshToken.js";
import { AdminLogoutUseCase } from "../../application/useCases/admin/admin.logout.js";
import { AdminAuthMiddleware } from "../../interfaces/middlewares/adminAuth.middleware.js";

const jwtService = new JwtService();
const bcryptService = new BcryptService();
const adminRepositories = new AdminRepsitoriesImplement();
const adminLogin = new AdminLogin(adminRepositories, jwtService, bcryptService);
const adminRefreshToken = new AdminRefreshTokenUseCase(adminRepositories, jwtService);
const adminLogout = new AdminLogoutUseCase(adminRepositories, jwtService);
const adminAuthMiddleware = new AdminAuthMiddleware(adminRepositories,jwtService)

export const adminController = new AdminController(adminLogin, adminRefreshToken,adminLogout);
export {adminAuthMiddleware}
