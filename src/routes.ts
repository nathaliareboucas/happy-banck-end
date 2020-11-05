import {Router} from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';
import UserController from './controllers/UserController';
import AuthController from './controllers/AuthController';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/auth', AuthController.authenticate);
routes.post('/users', UserController.create);

routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages', upload.array('images'), OrphanagesController.create);

export default routes;