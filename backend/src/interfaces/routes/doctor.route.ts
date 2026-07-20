import { doctorController, doctorRequestController } from "../../infrastructure/di/doctor.controller.js";
import { doctorDocumentFields } from "../middlewares/cloudinaryFields.js";
import { uploadDoctorDocuments } from "../middlewares/upload..middleware.js";
import { Router } from "express";
const router = Router()



router.post('/register-request',uploadDoctorDocuments.fields(doctorDocumentFields),doctorRequestController.register.bind(doctorRequestController))
router.post('/create-password',doctorController.createPassword.bind(doctorController))
router.post('/login',doctorController.login.bind(doctorController))

export default router;