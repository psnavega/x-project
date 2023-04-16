import bcrypt from 'bcrypt';

const saltRounds = 10;

export async function generateHash({ senha }: { senha: string }): Promise<string> {
    const hash = bcrypt.hash(senha, saltRounds)
        .then(function(hash: string) {
            return hash;
        })
        .catch(e => {
            console.log(e);
            return e.message;
        })

    return hash;
}

export async function checkPassword({ senha, databaseSenha }: { senha: string, databaseSenha: string }) {
    const result = await bcrypt.compare(senha, databaseSenha);

    return result;
}
