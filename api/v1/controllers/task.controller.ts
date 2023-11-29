import Task from "../../../models/task.model";
import { Request, Response } from "express";

export const index = async (req: Request, res: Response): Promise<void> => {
  interface Find {
    deleted: boolean;
    status?: string;
  }

  const find: Find = {
    deleted: false,
  };

  // nếu có status
  if (req.query.status) {
    find.status = req.query.status.toString();
  }

  const tasks = await Task.find(find);
  res.json(tasks);
};

export const detail = async (req: Request, res: Response): Promise<void> => {
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
};
