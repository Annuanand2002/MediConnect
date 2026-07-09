import { AdminController } from "../../interfaces/controllers/admin.controller.js";
import { AdminLogin } from "../../application/useCases/admin/admin.login.js";
import { AdminRepsitoriesImplement } from "../../infrastructure/repositries/admin.repo.implement.js";
import { JwtService } from "../../infrastructure/services/jwt.services.js";
import { BcryptService } from "../../infrastructure/services/bcrypt.services.js";



const jwtService = new JwtService();
const bcryptService = new BcryptService();
const adminRepositories = new AdminRepsitoriesImplement();
const adminLogin = new AdminLogin(adminRepositories, jwtService, bcryptService);
export const adminController = new AdminController(adminLogin);