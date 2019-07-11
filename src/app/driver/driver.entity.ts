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
    phone: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    isDeleted: boolean;

    @Column({ nullable: true })
    available: boolean;

    @Column({ nullable: true })
    transportType: string;

    @Column({ nullable: true })
    status: string;

    @Column({ nullable: true })
    transportDescription: string;

    @Column({nullable: true})
    lastLogin: Date;

    @Column({nullable: true})
    lastOnline: Date;

    @Column({nullable: true})
    locationLat: string;

    @Column({nullable: true})
    locationLon: string;

    @Column({nullable: true})
    forgotPassCode: string;

    @Column({nullable: true})
    token: string;

    @Column({nullable: true})
    deviceId: string;

    @Column({nullable: true})
    devicePlatform: string;

    @Column({nullable: true})
    image: string;

    @Column({nullable: true})
    language: string;

    @Column({nullable: true})
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