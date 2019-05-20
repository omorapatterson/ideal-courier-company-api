import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Company } from '../company/company.entity';
import { Team } from '../team/team.entity';

@Entity()
export class Driver {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 50 })
    firstName: string;

    @Column({ length: 50 })
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ default: false })
    isDeleted: boolean;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @ManyToOne(type => Company)
    @JoinColumn({ name: "company", referencedColumnName: 'id' })
    company: Company;

    @ManyToOne(type => Team)
    @JoinColumn({ name: "team_id", referencedColumnName: 'id' })
    team: Company;
}