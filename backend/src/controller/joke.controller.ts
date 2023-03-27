import { getRepository, Repository } from "typeorm";
import { Request, Response } from "express";

import { Joke } from "../entity/joke.model";

export class JokeController {

    public static async getAllJokes(_:Request, res: Response) {
        const jokeRepository = getRepository(Joke);
        try {
            const joke = await jokeRepository.find();
            res.send({ status: 'ok', data: joke});
        } catch (error) {
            res.status(404).send({status: 'not found'});
        }
    }

    public static async getJoke(req: Request, res: Response) {
        const jId = req.params.jokeId;
        const jokeRepository = getRepository(Joke);
        try {
            const joke = await jokeRepository.findOneOrFail(jId);
            res.send({status: 'ok', data: joke});
        } catch (error) {
            res.status(404).send({status: 'not found'});
        }
    }

    public static async createJoke(req: Request, res: Response) {
        const  { name, description, count} = req.body;
        console.log(req.body);
        const joke = new Joke();
        //joke.id = id;
        joke.name = name;
        //joke.active = active;
        joke.description = description;
        joke.count = count;
    
        const jokeRepository = getRepository(Joke);

        try {
           // const createdJoke:
            const createdJoke = await jokeRepository.save(joke);
            res.send({ 
                status: 'create successful',
                data: createdJoke,
            });
        } catch (error) {
            res.status(404).send({ status: 'not saved' });
        }
    }

    public static async updateJoke(req: Request, res: Response) {
        
        const jId = req.params.jokeId;
        const  { id, name, active, description, count} = req.body;
    
        const jokeRepository = getRepository(Joke)
    
        try {
            let joke = await jokeRepository.findOneOrFail(jId);

            joke.id = id;
            joke.name = name;
            joke.active = active;
            joke.description = description;
            joke.count = count;
        
            joke = await jokeRepository.save(joke);
    
            res.send({
                status: 'update successful',
                data: joke,
          });
        } catch (error){
            res.status(404).send({
              status: 'problem by update!',
            });
        }
    }

    public static async deleteJoke(req: Request, res: Response) {
        const jId = req.params.jokeId;
        const jokeRepository = getRepository(Joke)
    
        try {
          const joke = await jokeRepository.findOneOrFail(jId);
          await jokeRepository.remove(joke);
          res.send({
            status: 'remove successful',
          });
        } catch (error){
            res.status(404).send({
              status: 'remove problem',
            });
        }
    }
    
    public static async removeAll(_: Request, res: Response) {
        const jokeRepository = getRepository(Joke);

        try {
            const jokes = await jokeRepository.find();
            jokes.forEach(async (elem) => {
                await jokeRepository.remove(elem);
            })
            res.send({ status: 'remove all successful' });
        } catch (error) {
            res.status(404).send({ status: 'remove problem' });
        }
    }
}