import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

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
}
