import { Router } from "express";
const router: Router = Router();
import * as controller from "../controllers/user.controller";
import * as authenMiddleware from "../middlewares/authen.middleware";
// [POST] /api/v1/users/register
router.post("/register", controller.register);

// [POST] /api/v1/users/login
router.post("/login", controller.login);

// [GET] /api/v1/users/detail
router.get("/detail", authenMiddleware.requireAuth, controller.detail);

export const usersRoute: Router = router;
