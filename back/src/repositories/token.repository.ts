import { AppDataSource } from "../config/postgres/data-source";
import { Token } from "../entity/Token";
import { IToken } from "../interfaces/token.interface";
import { IUser } from "../interfaces/user.interfaces";

const tokenRepository = AppDataSource.getRepository(Token);

export async function saveToken({ user, token }: { user: IUser, token: string }) {
    try {

        const result = await tokenRepository.save({
            token,
            created_at: new Date(),
            updated_at: new Date(),
            user,
            is_valid: true
        });
    
        return result;
    } catch (e: unknown) {
        console.log(e);
        throw e;
    }
}

export async function updateStatusToken({ token }: { token: string }) {
    try{
        const result = await tokenRepository.createQueryBuilder()
            .update(Token)
            .set({ is_valid: false })
            .where("token = :token", { token })
            .execute();

        return result;
    } catch (e: unknown) {
        console.log(e);
        throw e;
    }
}
