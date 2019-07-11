import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
//
import { Company } from '../company/company.entity';

@Entity()
export class Stop {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  address: string;
  
  @Column()
  aka: string;

  @Column()
  comments: string;

  @Column()
  description: string;
  
  @Column()
  ip_address: string;

  @Column()
  name: string;
  
  @Column()
  notes: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToOne(type => Company)
  @JoinColumn({ name: "company", referencedColumnName: 'id' })
  company: Company;
}