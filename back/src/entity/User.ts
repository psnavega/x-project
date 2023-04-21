import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Token } from "./Token"

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    email: string

    @Column()
    senha: string

    @Column()
    idade: number

    @Column()
    created_at: Date

    @Column()
    updated_at: Date

    @OneToMany(() => Token, (token) => token.user)
    token: Token[]
}
