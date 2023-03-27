/** Package imports */
import { Router } from 'express';
import { getJokesFromExternalApi } from '../controller/jokesApi.controller'

/** Variables */
export const externalApiRouter: Router = Router({ mergeParams: true });

/** Routes */
externalApiRouter.get('/', getJokesFromExternalApi);
