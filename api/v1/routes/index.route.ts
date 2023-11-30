import { Express } from "express";
import { tasksRoute } from "./task.route";
import { usersRoute } from "./user.route";

const mainV1Routes = (app: Express): void => {
  const version = "/api/v1";

  app.use(version + "/tasks", tasksRoute);
  app.use(version + "/users", usersRoute);
};

export default mainV1Routes;
