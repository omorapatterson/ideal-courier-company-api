import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Team } from '../team/team.entity';

@Entity()
export class Company {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column()
    address: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    zip: number;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;


    @OneToMany(type => User, user => user.company)
    users: User[];

    @OneToMany(type => Team, team => team.company)
    teams: Team[];
}