import { getRepository, Repository } from "typeorm";
import { Request, Response } from "express";

import { Joke } from "../entity/joke.model";

export class TopJokeController {
    
    public static async top(req: Request, res: Response) {
        const jokeRepository = getRepository(Joke);
        const ratingLess = req.params.ratingLess;
        console.log(ratingLess);
        try {
            const jokes = await jokeRepository.find({
                where: {
                    count: ratingLess,
                }
            });
            res.send({ status: 'ok', data: jokes });
        } catch (error) {
            res.status(404).send({ status: 'not found' });
        }
    }

}