import Task from "../../../models/task.model";
import { Request, Response } from "express";

export const index = async (req: Request, res: Response): Promise<void> => {
  const tasks = await Task.find({
    deleted: false,
  });
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
