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

    @Column({ default: false })
    isDeleted: boolean;

    @Column({ default: false })
    available: boolean;

    @Column({ default: false })
    transportType: string;

    @Column({ default: false })
    status: string;

    @Column({ default: false })
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