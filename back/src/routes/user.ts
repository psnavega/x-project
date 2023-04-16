import { Router } from 'express';
import {
    getUserController,
    saveUserController,
    deleteUserController,
    updateUserController,
    getAllUsersController
} from '../controllers/user.controller';
import { verifyJWT } from '../utils/jwt.util';

const routes = Router();

routes.get('/user', getUserController);
routes.get('/users', verifyJWT, getAllUsersController);
routes.post('/user', saveUserController);
routes.patch('/user/:id', verifyJWT, updateUserController);
routes.delete('/user/:id', verifyJWT, deleteUserController);

export default routes;
