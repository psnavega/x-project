import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { updateStatusToken } from '../repositories/token.repository';

export function factoryToken({ id }: { id: string }): string {
    const token = jwt.sign({ id }, String(process.env.JWT_SECRET), {
        expiresIn: 3600
    });
    return token;
}

export async function verifyJWT(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.header('Authorization');

    try {
        if (authHeader && authHeader.startsWith('Bearer')) {
            const token = authHeader.split(' ')[2];
            jwt.verify(token, String(process.env.JWT_SECRET), async function(err, decoded) {
                if(err) {
                    if (err.name === 'TokenExpiredError') {
                        await updateStatusToken({ token });
                    }
                    return next(new Error('Failed to authenticate'));
                }
                return next();
            });
        }
    } catch (e: unknown) {
        console.log(e);
        throw new Error('Failed to autenticate');
    }
}