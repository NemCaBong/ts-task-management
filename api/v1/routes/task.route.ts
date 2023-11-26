import { Response, Request, Router } from "express";
const router: Router = Router();

import Task from "../../../models/task.model";

// [GET] /api/v1/tasks
router.get("/", async (req: Request, res: Response): Promise<void> => {
  const tasks = await Task.find({
    deleted: false,
  });
  res.json(tasks);
});

// [GET] /api/v1/tasks/detail/:id
router.get(
  "/detail/:id",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const id: string = req.params.id;

      const task = await Task.findOne({
        deleted: false,
        _id: id,
      });
      res.json(task);
    } catch (error) {
      res.json({
        code: 400,
      });
    }
  }
);

export const tasksRoute: Router = router;
