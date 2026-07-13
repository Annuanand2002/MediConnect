import { Router } from "express";
import { adminController } from "../../infrastructure/di/admin.controller.js";

const router = Router();


router.post("/login", adminController.login.bind(adminController));
router.post("/refresh-token", adminController.refreshToken.bind(adminController));
router.post("/logout", adminController.logout.bind(adminController));

export default router;