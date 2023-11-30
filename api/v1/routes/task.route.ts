import { Router } from "express";
const router: Router = Router();
import * as controller from "../controllers/task.controller";

// [GET] /api/v1/tasks
router.get("/", controller.index);

// [GET] /api/v1/tasks/detail/:id
router.get("/detail/:id", controller.detail);

// [{PATCH}] /api/v1/tasks/change-status/:id
router.patch("/change-status/:id", controller.changeStatus);

export const tasksRoute: Router = router;
