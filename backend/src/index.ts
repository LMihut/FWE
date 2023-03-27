import express, { Request, Response } from "express";
import { globalRouter } from "./router/global.router";
import { createDatabaseConnection } from "./util/createDatabaseConnection";
import * as bodyParser from "body-parser";

const port = 4000;

export const startServer = async () => {

  try {
    const app = express();
    const dbConnection = await createDatabaseConnection();

    app.use(bodyParser.json());

    app.use(function (req, res, next) {
      console.log("Time:", new Date());
      next();
    });

    app.use("/api", globalRouter);

    const server = app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  
    return { server, dbConnection };

  } catch(e) {
    console.log(e);
    throw e;
  }
 
};

startServer();
