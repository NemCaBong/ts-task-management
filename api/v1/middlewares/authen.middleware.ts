import { NextFunction, Request, Response } from "express";
import User from "../../../models/user.model";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // console.log(req.headers);
  if (req.headers.authorization) {
    // set up bearer token trong postman
    // lấy ra header trong bearer header trong postman
    const token = req.headers.authorization.split(" ")[1];

    const user = await User.findOne({
      deleted: false,
      token: token,
    });

    if (!user) {
      res.json({
        code: 403,
        message: "Không có quyền truy cập",
      });
    } else {
      // gửi user qua request để controller nhận đc
      req["user"] = user;
      next();
    }
  } else {
    res.json({
      code: 403,
      message: "Không có quyền truy cập",
    });
  }
};
