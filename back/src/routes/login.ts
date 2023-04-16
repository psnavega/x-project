import { Router } from 'express';
import { login } from '../controllers/login.controller';

const routes = Router();

routes.post('/login', login);

export default routes;
