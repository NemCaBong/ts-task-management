import express, { Express, Request, Response } from "express";

import dotenv from "dotenv";
dotenv.config();

// connect DB
import * as configDB from "./config/database";
import Task from "./models/task.model";
configDB.connect();

// Khi dùng import thì app sẽ có kiểu là Express
const app: Express = express();

const port: number | string = process.env.PORT || 3002;

app.get("/tasks", async (req: Request, res: Response) => {
  const tasks = await Task.find({
    deleted: false,
  });
  res.json(tasks);
});

app.listen(port, () => {
  console.log("Listen " + port);
});
