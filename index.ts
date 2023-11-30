import express, { Express } from "express";
// connect DB
import * as configDB from "./api/v1/config/database";
import mainV1Routes from "./api/v1/routes/index.route";

import dotenv from "dotenv";
import bodyParser from "body-parser";
dotenv.config();

configDB.connect();

// Khi dùng import thì app sẽ có kiểu là Express
const app: Express = express();
const port: number | string = process.env.PORT || 3002;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

mainV1Routes(app);

app.listen(port, () => {
  console.log("Listen " + port);
});
