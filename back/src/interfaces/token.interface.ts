import { IUser } from "./user.interfaces";

export interface IToken {
    id: string,
    token: string,
    created_at: Date,
    updated_at: Date,
    user: IUser,
}