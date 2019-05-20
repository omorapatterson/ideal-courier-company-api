import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Company } from '../company/company.entity';

export enum UserRole {
    SUPER_ADMIN = 'root',
    EXPERT = 'expert',
    ADVISER = 'adviser',
    COMPANY = 'company',
}

@Entity()
export class User {
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

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.ADVISER,
    })
    role: UserRole;

    @Column({ default: false })
    isDeleted: boolean;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @ManyToOne(type => Company)
    @JoinColumn({ name: "company", referencedColumnName: 'id' })
    company: Company;
}