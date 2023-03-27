import { getRepository, Repository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import * as fs from 'fs';
import {AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from "axios";

import { Joke } from "../entity/joke.model";


export class DownloadController {
    public static async downloadJokes(_: Request, res: Response) {
        const jokeRepository = getRepository(Joke);

        try {
            const jokes = await jokeRepository.find();
            //console.log(jokes.length);
            //console.log(jokes);
            let data: any = gottoCSV(jokes);
            res.send(data);
        } catch (error) {
            res.status(404).send({ status: 'problem by download!' });
        }
    }

    public static async  externJoke (req: Request, res: Response){
        const requestOptions: AxiosRequestConfig = {
            method: 'get',
            url: 'https://api.chucknorris.io/jokes/random',
            responseType: 'json'
        };
        const apiResponse: AxiosResponse = await axios.request(requestOptions);
    
        const joke = new Joke();
        joke.name = 'Chuck Norris Joke-Id: ' + apiResponse.data.id;
        joke.description = apiResponse.data.value;
        joke.count = 1;
        joke.active = true;
    
        res.send({status: 'ok', data: joke});
    }
}

let gottoCSV = (data: any) => {
    if (data.length == 0) {
        return;
    }
    const separator = ',';
    const keys = Object.keys(data[0]);
    const csvContent =
        keys.join(separator) +
        '\n' +
        data.map((row: any) => {
            return keys.map(k => {
                let cell = row[k] === null || row[k] === undefined ? '' : row[k];
                cell = cell instanceof Date
                    ? cell.toLocaleString()
                    : cell.toString().replace(/"/g, '""');
                if (cell.search(/("|,|\n)/g) >= 0) {
                    cell = `"${cell}"`;
                }
                return cell;
            }).join(separator);
        }).join('\n');

    fs.writeFile('exportJokes.csv', csvContent, (error) => {
        if (error) throw error;
    });

    return csvContent;
}
