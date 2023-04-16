import {
        getAllUsersService,
        getUserService,
        saveUserService,
        deleteUserService,
        updateUserService
} from '../services/user.service';
import { Request, Response } from 'express';
import { checkPassword } from '../utils/bcrypt.util';
import { factoryToken } from '../utils/jwt.util';

export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        const user = await getUserService({ email });

        if (!user) throw new Error('Failed to login');

        const result = await checkPassword({ senha: password, databaseSenha: user.senha });

        if (!result) throw new Error('Failed to login');

        const token = factoryToken({ id: user.id });

        res.status(200).json({
            message: 'ok',
            token,
        });
    } catch (e: unknown) {
        return res.status(500).send({ message: 'Server error' });
    }
}