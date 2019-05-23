import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
//
import { Company } from '../company/company.entity';
import { Driver } from '../driver/driver.entity';

@Entity()
export class Route {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;
  
  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  routeTime: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToOne(type => Company)
  @JoinColumn({ name: "company", referencedColumnName: 'id' })
  company: Company;

  @ManyToOne(type => Driver)
  @JoinColumn({ name: "driver", referencedColumnName: 'id' })
  driver: Driver;
}