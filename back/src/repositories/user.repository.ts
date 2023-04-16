import { User } from "../entity/User";
import { AppDataSource } from "../config/postgres/data-source";
import { IUser } from '../interfaces/user.interfaces';

const userRepository = AppDataSource.getRepository(User);

export async function getAllUsers(): Promise<IUser[]> {
    try {
        
        const result = await userRepository.find();

        return result;
    } catch (e: unknown) {
        console.log(e);
        throw e;
    }
}

export async function getUser({ email }: { email: string }): Promise<IUser | null> {
    try {
        const result = await userRepository.findOneBy({ email });

        if (!result) throw new Error('User not found')

        return result;
    } catch (e: unknown) {
        console.log(e);
        throw e;
    }
}

export async function saveUser({
    email,
    senha,
    idade
} : {
    email: string,
    senha: string,
    idade: number
}): Promise<IUser> {
    try {
        const result = await userRepository.save({
            email,
            senha,
            idade,
            created_at: new Date(),
            updated_at: new Date(),
        });

        return result;
    } catch (e: unknown) {
        console.log(e);
        throw e;
    }
}

export async function updateUser({
    id,
    email,
    senha,
    idade
} : {
    id: string,
    email: string,
    senha: string,
    idade: number,
}): Promise<IUser | null> {
    try {
        const data = await userRepository.findOneBy({ id });

        if (!data) throw new Error('User doesnt exist');

        data.email = email;
        data.senha = senha;
        data.idade = idade;
        data.updated_at = new Date();

        await userRepository.save(data);

        return data;

    } catch (e: unknown) {
        console.log(e);
        throw e;
    }
}

export async function deleteUser({id}: {id: string}): Promise<IUser | null> {
    try {
        const data = await userRepository.findOneBy({ id });

        await userRepository.delete({ id });

        return data;
    } catch (e: unknown) {
        console.log(e);
        throw e;
    }
}

export { userRepository };