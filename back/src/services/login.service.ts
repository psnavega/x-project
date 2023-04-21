import { saveToken } from "../repositories/token.repository";
import { checkPassword } from "../utils/bcrypt.util";
import { factoryToken } from "../utils/jwt.util";
import { getUserService } from "./user.service";


export async function loginService({
    email,
    password
}: {
    email: string,
    password: string
}) {
    try {
        const user = await getUserService({ email });

        if (!user) throw new Error('Failed to login');
        console.log(user);

        const result = await checkPassword({ senha: password, databaseSenha: user.senha });

        if (!result) throw new Error('Failed to login');

        const token = factoryToken({ id: user.id });

        await saveToken({ user, token });

        return token;
    } catch (e: unknown) {
        console.log(e);
        throw e;
    }
}