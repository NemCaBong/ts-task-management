import User from "../../../models/user.model";
import { Request, Response } from "express";
import md5 from "md5";
import * as generateHelper from "../../../helpers/generate";

// [POST] /api/v1/users/register
export const register = async (req: Request, res: Response) => {
  try {
    const existsEmail = await User.findOne({
      deleted: false,
      email: req.body.email,
    });

    if (existsEmail) {
      res.json({
        code: 400,
        message: "Email đã tồn tại",
      });
      return;
    }

    // tránh lưu trường ko cần thiết vào DB
    const infoUser = {
      fullName: req.body.fullName,
      email: req.body.email,
      password: md5(req.body.password),
      token: generateHelper.generateRandomString(20),
    };

    const newUser = new User(infoUser);
    await newUser.save();

    res.cookie("token", newUser.token);

    res.json({
      code: 200,
      message: "Đăng ký thành công",
      token: newUser.token,
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Đăng ký thất bại" + error.message,
    });
  }
};

// [POST] /api/v1/users/login
export const login = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({
      email: email,
      deleted: false,
    });

    if (!user) {
      res.json({
        code: 400,
        message: "Sai tài khoản",
      });
      return;
    }

    if (md5(password) !== user.password) {
      res.json({
        code: 400,
        message: "Sai mật khẩu",
      });
      return;
    }
    const token: string = user.token;

    res.json({
      code: 200,
      message: "Đăng nhập thành công",
      token: token,
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Đăng nhập thất bại" + error.message,
    });
  }
};

// [GET] /api/v1/users/detail
export const detail = async (req: Request, res: Response) => {
  res.json({
    code: 200,
    message: "Lấy thông tin user thành công",
    info: req["user"],
  });
};
