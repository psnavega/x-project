import { IUser } from "../interfaces/user.interfaces";
import {
    getAllUsers,
    getUser,
    saveUser,
    updateUser,
    deleteUser
} from "../repositories/user.repository";
import {
    generateHash,
} from '../utils/bcrypt.util';

export async function getAllUsersService(): Promise<IUser[]> {
    try {
        const result = await getAllUsers();

        return result;
    } catch (e) {
        console.log(e);
        throw(e);
    }
}

export async function getUserService({ email }: { email: string }): Promise<IUser | null> {
    try {
        const result = await getUser({ email });

        return result;
    } catch (e: unknown) {
        console.log(e);
        throw(e);
    }
}

export async function saveUserService(
    {
        email,
        senha,
        idade
    }: {
        email: string,
        senha: string,
        idade: number,
}): Promise<IUser> {
    try {
        const hash = await generateHash({ senha });

        const result = await saveUser({ email, senha: hash, idade });

        return result;
    } catch(e: unknown) {
        console.log(e);
        throw e;
    }
}

export async function updateUserService(
    {
        id,
        email,
        senha,
        idade
    }: {
        id: string,
        email: string,
        senha: string,
        idade: number,
}): Promise<IUser | null> {
    try {
        const hash = await generateHash({ senha });
        

        const result = await updateUser({
            id,
            email,
            senha: hash,
            idade
        });

        return result;
    } catch(e: unknown) {
        console.log(e);
        throw e;
    }
}

export async function deleteUserService({id} : {id: string}): Promise<IUser | null> {
    try {
        const result = await deleteUser({ id });

        return result;    
    } catch (e: unknown) {
        console.log(e);
        throw e;
    }
}