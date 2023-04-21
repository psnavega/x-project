import { Request, Response } from 'express';
import { loginService } from '../services/login.service';

export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        
        const token = await loginService({ email, password });

        res.status(200).json({
            message: 'ok',
            token,
        });
    } catch (e: unknown) {
        return res.status(500).send({ message: 'Server error' });
    }
};
