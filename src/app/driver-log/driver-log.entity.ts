import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Driver } from '../driver/driver.entity';
import { Task } from '../task/Task.entity';

@Entity()
export class DriverLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  description: string;

  @Column()
  createdAt: Date;

  @ManyToOne(type => Driver)
  @JoinColumn({ name: "driver", referencedColumnName: 'id' })
  driver: Driver;
}