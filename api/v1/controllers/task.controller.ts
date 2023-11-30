import { paginationHelper } from "../../../helpers/pagination";
import { searchHelper } from "../../../helpers/search";
import Task from "../../../models/task.model";
import { Request, Response } from "express";

export const index = async (req: Request, res: Response) => {
  try {
    interface Find {
      deleted: boolean;
      status?: string;
      title?: RegExp;
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

    // PAGINATION
    const totalTasks = await Task.countDocuments(find);

    const paginationObj = paginationHelper(
      {
        currentPage: 1,
        limitItems: 5,
      },
      req.query,
      totalTasks
    );
    // END PAGINATION

    // FIND
    const searchObj = searchHelper(req.query);
    if (searchObj.keyword) {
      find.title = searchObj.keywordRegex;
    }
    // END FIND

    const tasks = await Task.find(find)
      .sort(sort)
      .limit(paginationObj.limitItems)
      .skip(paginationObj.skip);

    res.json({
      total: totalTasks,
      data: tasks,
    });
  } catch (error) {
    res.json({
      code: 400,
      error: error.message,
    });
  }
  // FIND
};

export const detail = async (req: Request, res: Response) => {
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
      error: error.message,
    });
  }
};

export const changeStatus = async (req: Request, res: Response) => {
  try {
    type StatusType = "initial" | "doing" | "finish" | "notFinish" | "pending";

    const id: string = req.params.id;
    const status: StatusType = req.body.status;

    await Task.updateOne({ _id: id }, { status: status });

    res.json({ code: 200, message: "Cập nhật trạng thái thành công!" });
  } catch (error) {
    res.json({
      code: 400,
      message: "Cập nhật trạng thái không thành công! " + error.message,
    });
  }
};
