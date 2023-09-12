import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid') // 'uuid' is a type of column that is generated automatically by the database
    id: string;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;
}