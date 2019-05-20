import { Column, Entity, JoinColumn, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Plan } from '../plan/plan.entity';
import { Company } from '../company/company.entity';

@Entity()
export class CompanyPlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sector: string;

  @Column('text')
  description: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToOne(type => Plan)
  @JoinColumn({ name: "plan", referencedColumnName: 'id' })
  plan: Plan;

  @ManyToOne(type => Company)
  @JoinColumn({ name: "company", referencedColumnName: 'id' })
  company: Company;
}