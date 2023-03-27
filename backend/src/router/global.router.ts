import { Request, Response, Router } from "express";
import { jokeRouter } from "./joke.router";
import { topRouter } from "./topJoke.router";
import { externalApiRouter } from "./jokesApi.router";
import { downloadRouter } from './download.router';

export const globalRouter = Router({ mergeParams: true });

interface HelloWorldReponse {
  message: string;
}
globalRouter.get("/", (_:Request, res: Response) => {
  res.send({ message: "hello world global" } as HelloWorldReponse);
});

globalRouter.use('/joke', jokeRouter);
globalRouter.use('/top', topRouter);
globalRouter.use('/externalApi', externalApiRouter);
globalRouter.use('/download', downloadRouter);