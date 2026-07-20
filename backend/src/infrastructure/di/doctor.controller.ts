import { GetallDoctorsRequestUseCase } from "../../application/useCases/admin/getAllDoctorsRequests.usecase.js";
import { RegisterDoctorRequestUseCase } from "../../application/useCases/doctor/registerDoctorRequest.js";
import { DoctorRequestcontroller } from "../../interfaces/controllers/doctorRequest.controller.js";
import { DoctorRequestRepository } from "../repositries/doctorRequest.repo.implement.js";
import { CloudinaryServices } from "../services/cloudinary/cloudinary.services.js";
import { AdminDoctorController } from "../../interfaces/controllers/admin/adminDoctor.controller.js";
import { GetDoctorRequestByIdUseCase } from "../../application/useCases/admin/getDoctorRequestById.usecase.js";
import { ApproveDoctorRequestUseCase } from "../../application/useCases/doctor/approveDoctorRequest.usecase.js";
import { DoctorRepository } from "../repositries/doctor.repo.implement.js";
import { DepartmentRepository } from "../repositries/department.repo.implement.js";
import { EmailService } from "../services/email.services.js";
import { CreatePasswordUseCase } from "../../application/useCases/doctor/createPasswordUseCase.js";
import { DoctorController } from "../../interfaces/controllers/doctor.controller.js";
import { LoginDoctorUseCase } from "../../application/useCases/doctor/loginDoctorUseCase.js";
import { JwtService } from "../../infrastructure/services/jwt.services.js";
import { BcryptService } from "../../infrastructure/services/bcrypt.services.js";



const doctorRequestRepository  = new DoctorRequestRepository();
const doctorRepository = new DoctorRepository();
const departmentRepository = new DepartmentRepository()
const cloudinaryService = new CloudinaryServices();
const emailService = new EmailService();
const registerDoctorRequestUseCase = new RegisterDoctorRequestUseCase(doctorRequestRepository);
const doctorRequestController = new DoctorRequestcontroller(registerDoctorRequestUseCase,cloudinaryService);
const getAllDoctorRequestUseCase = new GetallDoctorsRequestUseCase(doctorRequestRepository);
const getDoctorRequestByIdUseCase = new GetDoctorRequestByIdUseCase(doctorRequestRepository);
const approveDoctorRequestUseCase = new ApproveDoctorRequestUseCase(doctorRequestRepository,doctorRepository,departmentRepository,emailService)
const adminDoctorController = new AdminDoctorController(getAllDoctorRequestUseCase,getDoctorRequestByIdUseCase,approveDoctorRequestUseCase)

const createPasswordUseCase = new CreatePasswordUseCase(doctorRepository)
const jwtService = new JwtService();
const bcryptService = new BcryptService();
const loginDoctorUseCase = new LoginDoctorUseCase(doctorRepository,bcryptService,jwtService)
const doctorController = new DoctorController(createPasswordUseCase,loginDoctorUseCase)
export {doctorRequestController,cloudinaryService,registerDoctorRequestUseCase,doctorRequestRepository,getAllDoctorRequestUseCase,adminDoctorController,doctorController}