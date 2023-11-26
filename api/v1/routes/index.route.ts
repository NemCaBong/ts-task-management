import { Express } from "express";
import { tasksRoute } from "./task.route";

const mainV1Routes = (app: Express): void => {
  const version = "/api/v1";

  app.use(version + "/tasks", tasksRoute);
};

export default mainV1Routes;
