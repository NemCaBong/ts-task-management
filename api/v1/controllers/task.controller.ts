import { paginationHelper } from "../../../helpers/pagination";
import { searchHelper } from "../../../helpers/search";
import Task from "../../../models/task.model";
import { Request, Response } from "express";

// [GET] /api/v1/tasks
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

// [GET] /api/v1/tasks/detail/:id
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

// [PATCH] /api/v1/tasks/change-status/:id
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
// [PATCH] /api/v1/tasks/change-multi
export const changeMulti = async (req: Request, res: Response) => {
  try {
    enum Key {
      STATUS = "status",
      DELETED = "deleted",
    }

    const ids: string[] = req.body.ids;
    const key: string = req.body.key;
    const value: string = req.body.value;

    switch (key) {
      case Key.STATUS:
        await Task.updateMany(
          {
            _id: { $in: ids },
          },
          {
            status: value,
          }
        );
        res.json({
          code: 200,
          message: "Cập nhật nhiều trạng thái thành công!",
        });
        break;
      case Key.DELETED:
        await Task.updateMany(
          {
            _id: { $in: ids },
          },
          {
            deleted: true,
            deletedAt: new Date(),
          }
        );
        res.json({
          code: 200,
          message: "Xóa nhiều tasks thành công!",
        });
        break;
      default:
        res.json({
          code: 400,
          message: "Không tồn tại! ",
        });
        break;
    }
  } catch (error) {
    res.json({
      code: 400,
      message: "Cập nhật nhiều trạng thái không thành công! " + error.message,
    });
  }
};

// [POST] /api/v1/tasks/create
export const create = async (req: Request, res: Response) => {
  try {
    const task = new Task(req.body);
    const data = await task.save();
    res.json({
      code: 200,
      message: "Tạo sản phẩm mới thành công",
      data: data,
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Tạo tasks lỗi " + error.message,
    });
  }
};
// [PATCH] /api/v1/tasks/edit/:id
export const edit = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    await Task.updateOne({ _id: id }, req.body);
    res.json({
      code: 200,
      message: "Chỉnh sửa sản phẩm thành công",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Chỉnh sửa thất bại " + error.message,
    });
  }
};

// [DELETE] /api/v1/tasks/delete/:id
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;

    await Task.updateOne(
      {
        _id: id,
      },
      {
        deleted: true,
        deletedAt: new Date(),
      }
    );
    res.json({
      code: 200,
      message: "Xóa task thành công",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Xóa tasks thất bại " + error.message,
    });
  }
};
