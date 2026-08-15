import { Router } from "express";
import { UserRepository } from "./user.repository.js";
import { UserService } from "./user.service.js";
import { UserController } from "./user.controller.js";
import { validate } from "../../shared/middlewares/validate.js";
import { loginSchema, registerSchema } from "./user.schema.js";

const router = Router();
const authRepository = new UserRepository();
const authService = new UserService(authRepository);
const authcontroller = new UserController(authService);

router.post("/register", validate(registerSchema), authcontroller.register);
router.post("/login", validate(loginSchema), authcontroller.login);
export default router;
