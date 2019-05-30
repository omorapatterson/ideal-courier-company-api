import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Company } from '../company/company.entity';
import { Role } from '../role/role.entity';

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
    
    @Column({ default: false })
    isDeleted?: boolean;

    @Column()
    email: string;

    @Column({ length: 50 })
    firstName: string;

    @Column()
    language: string;
    
    @Column({nullable: true})
    lastLogin?: Date;
    
    @Column({ length: 50 })
    lastName: string;
    
    @Column()
    password: string;

    @Column()
    phone: string;
    
    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.ADVISER,
    })
    role: UserRole;

    @Column({nullable: true})
    verificationCode: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @ManyToOne(type => Company)
    @JoinColumn({ name: "company", referencedColumnName: 'id' })
    company: Company;

}