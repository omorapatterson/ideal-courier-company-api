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

    @Column({ length: 50 })
    userName: string;

    @Column({ length: 50 })
    phone: string;

    @Column()
    password: string;

    @Column({ default: false })
    isDeleted: boolean;

    @Column({ default: false })
    available: boolean;

    @Column()
    transportType: string;

    @Column()
    status: string;

    @Column()
    transportDescription: string;

    @Column()
    lastLogin: Date;

    @Column()
    lastOnline: Date;

    @Column()
    locationLat: string;

    @Column()
    locationLon: string;

    @Column()
    forgotPassCode: string;

    @Column()
    token: string;

    @Column()
    deviceId: string;

    @Column()
    devicePlatform: string;

    @Column()
    image: string;

    @Column()
    language: string;

    @Column()
    rating: number;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @ManyToOne(type => Company)
    @JoinColumn({ name: "company", referencedColumnName: 'id' })
    company: Company;

    @ManyToOne(type => Team)
    @JoinColumn({ name: "team_id", referencedColumnName: 'id' })
    team: Team;
}