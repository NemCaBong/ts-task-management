import { Router } from "express";
const router: Router = Router();
import * as controller from "../controllers/task.controller";

// [GET] /api/v1/tasks
router.get("/", controller.index);

// [GET] /api/v1/tasks/detail/:id
router.get("/detail/:id", controller.detail);

// [{PATCH}] /api/v1/tasks/change-status/:id
router.patch("/change-status/:id", controller.changeStatus);

// [{PATCH}] /api/v1/tasks/change-multi
router.patch("/change-multi", controller.changeMulti);

// [POST] /api/v1/tasks/create
router.post("/create", controller.create);

// [PATCH] /api/v1/tasks/edit/:id
router.patch("/edit/:id", controller.edit);

// [DELETE] /api/v1/tasks/edit/:id
router.delete("/delete/:id", controller.deleteTask);

export const tasksRoute: Router = router;
