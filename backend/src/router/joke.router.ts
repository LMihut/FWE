import { Router } from "express";
import { JokeController } from "../controller/joke.controller";

export const jokeRouter = Router({ mergeParams: true });

jokeRouter.get("/", JokeController.getAllJokes);
jokeRouter.get("/:id", JokeController.getJoke);
jokeRouter.post("/", JokeController.createJoke);
jokeRouter.delete("/:id", JokeController.deleteJoke);
jokeRouter.patch("/:id", JokeController.updateJoke);
jokeRouter.delete("/", JokeController.removeAll);
