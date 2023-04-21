import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export function factoryToken({ id }: { id: string }): string {
    const token = jwt.sign({ id }, String(process.env.JWT_SECRET), {
        expiresIn: 3600
    });

    return token;
}

export function verifyJWT(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.header('Authorization');

    try {
        if (authHeader && authHeader.startsWith('Bearer')) {
            const token = authHeader.split(' ')[2];
            jwt.verify(token, String(process.env.JWT_SECRET), function(err, decoded) {
                if(err) throw new Error('Failed to autenticate')
                
                return next();
            });
        }
    } catch (e: unknown) {
        console.log(e);
        throw new Error('Failed to autenticate');
    }
}