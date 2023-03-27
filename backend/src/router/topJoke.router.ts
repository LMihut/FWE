import { Router } from 'express';
import { TopJokeController } from '../controller/topJoke.controller';

/** Variables */
export const topRouter: Router = Router({ mergeParams: true });

/** Routes */
topRouter.get('/:ratingLess', TopJokeController.top);