
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ nullable: true })
    name!: string;

    @Column({ nullable: true })
    surname!: string;

    @Column({ nullable: true })
    email!: string;

    @Column({ default: false })
    deleted!: boolean;
}
