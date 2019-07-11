import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
//
import { Plan } from '../plan/plan.entity';
import { User } from '../user/user.entity';
import { Task } from '../task/task.entity';
import { Team } from '../team/team.entity';

@Entity()
export class Company {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    phone: string;

    /*@Column()
    countryCode: string;
    
    @Column()
    status: string;
    
    @Column()
    autoAssign: boolean;
    
    @Column()
    autoassignNotifyEmail: boolean;
    
    @Column()
    requestExpire: number;
    
    @Column()
    autoAssignType: string;
    
    @Column()
    assignRequestExpire: number; */

    @Column()
    email: string;

    @Column()
    address: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    language: string;
    
    @Column()
    driverAssignRadius: number;

    @Column()
    zip: number;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    /*@ManyToOne(type => Plan)
    @JoinColumn({ name: "company_plan", referencedColumnName: 'id' })
    companyPlan: Plan;
    
    @OneToMany(type => User, user => user.company)
    users: User[];

    @OneToMany(type => Task, task => task.company)
    tasks: Task[];

    @OneToMany(type => Team, team => team.company)
    teams: Team[];*/

}