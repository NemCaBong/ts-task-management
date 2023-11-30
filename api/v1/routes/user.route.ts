import { Router } from "express";
const router: Router = Router();
import * as controller from "../controllers/user.controller";

// [POST] /api/v1/users/register
router.post("/register", controller.register);

// [POST] /api/v1/users/login
router.post("/login", controller.login);

export const usersRoute: Router = router;
