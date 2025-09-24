import { Router } from "express";
import UserController from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.get("/users", authenticate, UserController.getAllUser);

export default router;
