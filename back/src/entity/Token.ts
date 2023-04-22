import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { User } from "./User";

@Entity()
export class Token {

    @PrimaryGeneratedColumn("uuid")
    id: string

   @Column()
   token: string

    @Column()
    created_at: Date

    @Column()
    updated_at: Date

    @Column({ default: true })
    is_valid: boolean

    @ManyToOne(() => User, (user) => user.token)
    @JoinColumn({ name: "user_id" }) 
    user: User
}