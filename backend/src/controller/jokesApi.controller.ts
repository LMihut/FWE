
import { Request, Response } from 'express';
import fetch from 'node-fetch';

export const getJokesFromExternalApi = async(_:Request, res: Response) =>{
    const response = await fetch('http://api.icndb.com/jokes/random/10', {
        method: 'GET',
    });
    const jokes = await response.json();
    res.send({
        data: jokes.value.map((joke: any) => {
            return {
                id: joke.id,
                name: joke.joke,
            };
        }),
    });
};
