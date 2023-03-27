import { Router } from 'express';
import { DownloadController } from '../controller/download.controller';

/** Variables */
export const downloadRouter: Router = Router({ mergeParams: true });

/** Routes */
downloadRouter.get('/all', DownloadController.downloadJokes);
downloadRouter.get('/externJoke', DownloadController.externJoke);