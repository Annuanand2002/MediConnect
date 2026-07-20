import { Router } from "express";
import { adminAuthMiddleware, adminController } from "../../infrastructure/di/admin.controller.js";
import {adminDoctorController} from '../../infrastructure/di/doctor.controller.js'

const router = Router();


router.post("/login", adminController.login.bind(adminController));
router.post("/refresh-token", adminController.refreshToken.bind(adminController));
router.post("/logout", adminController.logout.bind(adminController));
router.get('/profile',adminAuthMiddleware.authenticate.bind(adminController))
router.get('/me',adminAuthMiddleware.authenticate.bind(adminAuthMiddleware),
adminController.me.bind(adminController))

router.get('/doctor-requests',adminAuthMiddleware.authenticate.bind(adminAuthMiddleware), adminDoctorController.getAllDcotorRequest.bind(adminDoctorController))
router.get('/doctor-requests/:id',adminAuthMiddleware.authenticate.bind(adminAuthMiddleware), adminDoctorController.getDoctorRequestById.bind(adminDoctorController))
router.patch("/doctor-requests/:id/approve",adminAuthMiddleware.authenticate.bind(adminAuthMiddleware),adminDoctorController.approveDoctorRequest.bind(adminDoctorController))



export default router;