import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Permision } from "../permision/permision.entity";
import { Role } from "../role/role.entity";

@Entity()
export class RolePermision {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'int' })
    position: number;

    @ManyToOne(type => Permision, permision => permision.roles)
    @JoinColumn({ name: "permision", referencedColumnName: 'id' })
    permision: Permision;

    @ManyToOne(type => Role, role => role.permisions)
    @JoinColumn({ name: "role", referencedColumnName: 'id' })
    role: Role;

}
