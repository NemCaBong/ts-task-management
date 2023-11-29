import Task from "../../../models/task.model";
import { Request, Response } from "express";

export const index = async (req: Request, res: Response): Promise<void> => {
  // FIND
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

  // END FIND

  // SORT
  const sort = {};
  // có thể định nghĩa interface để giới hạn các trường
  // có thể đc sort

  if (req.query.sortKey && req.query.sortValue) {
    const sortKey = req.query.sortKey.toString();
    sort[sortKey] = req.query.sortValue;

    // sort.sortKey thì ko đc
  }

  // END SORT

  const tasks = await Task.find(find).sort();
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
