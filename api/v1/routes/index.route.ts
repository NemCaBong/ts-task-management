import { Express } from "express";
import { tasksRoute } from "./task.route";
import { usersRoute } from "./user.route";
import * as authenMiddleware from "../middlewares/authen.middleware";

const mainV1Routes = (app: Express): void => {
  const version = "/api/v1";

  app.use(version + "/tasks", authenMiddleware.requireAuth, tasksRoute);
  app.use(version + "/users", usersRoute);
};

export default mainV1Routes;
