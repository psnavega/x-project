import {
    getUserService,
    saveUserService,
    deleteUserService,
    updateUserService,
    getAllUsersService
} from "../services/user.service";
import { Request, Response } from "express";
import { client } from "../config/redis/redisConnect";

export async function getAllUsersController(req: Request, res: Response) {
    try {
        let result;
        const cacheResult = await client.get('allUsers');

        if (cacheResult === null || cacheResult === undefined) {
            result = await getAllUsersService();
            await client.set('allUsers', JSON.stringify(result));
        } else {
            result = JSON.parse(cacheResult) as IUser[];
        }

        res.status(200).send({ message: result })
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: e })
    }
}

export async function getUserController(req: Request, res: Response) {
    try {
        const { email } = req.params;

        const result = await getUserService({ email });

        return res.status(200).send({ message: result })
    } catch (e: unknown) {
        console.log(e);
        return res.status(500).send({ message: e })
    }
}

export async function saveUserController(req: Request, res: Response) {
    try {
        const {
            email,
            senha,
            idade,
        } = req.body

        const result = await saveUserService({ email, senha, idade });

        return res.status(200).send({ message: 'ok'});
    } catch(e: unknown) {
        console.log(e);
        return res.status(500).send({ message: e })
    }
}

export async function updateUserController(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const {
            email,
            senha,
            idade
        } = req.body;

        const result = await updateUserService({
            id,
            email,
            senha,
            idade,
        })

        return res.status(200).send({ message: 'ok' });
    } catch(e: unknown) {
        console.log(e);
        return res.status(500).send({ message: e })
    }
}

export async function deleteUserController(req: Request, res: Response) {
    try {
        const {
            id
        } = req.params;

        const result = await deleteUserService({ id });

        return res.status(200).send({ message: 'ok' });
    } catch (e: unknown) {
        console.log(e);
        return res.status(500).send({ message: e })
    }
}
