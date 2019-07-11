import { Column, Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { RolePermision } from '../role-permision/role-permision.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  description: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
  
  @OneToMany(type => RolePermision, permision => permision.role)
  permisions: RolePermision[];
}