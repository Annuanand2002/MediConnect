import { Router } from "express";
import { adminController } from "../../infrastructure/di/admin.controller.js";

const router = Router();


router.post("/login", adminController.login.bind(adminController));


export default router;