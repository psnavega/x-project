import bcrypt from 'bcrypt';

const saltRounds = 10;

export async function generateHash({ senha }: { senha: string }): Promise<string> {
    const hash = await bcrypt.hash(senha, saltRounds)

    return hash;
}

export async function checkPassword({ senha, databaseSenha }: { senha: string, databaseSenha: string }) {
    const result = await bcrypt.compare(senha, databaseSenha);

    return result;
}
