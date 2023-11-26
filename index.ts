import express, { Express } from "express";
// connect DB
import * as configDB from "./api/v1/config/database";
import mainV1Routes from "./api/v1/routes/index.route";

import dotenv from "dotenv";
dotenv.config();

configDB.connect();

// Khi dùng import thì app sẽ có kiểu là Express
const app: Express = express();
const port: number | string = process.env.PORT || 3002;

mainV1Routes(app);

app.listen(port, () => {
  console.log("Listen " + port);
});
