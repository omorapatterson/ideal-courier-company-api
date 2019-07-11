import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { TaskDriver } from '../task-driver/task-driver.entity';

@Entity()
export class TaskDriverWaypoint {
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

  @ManyToOne(type => TaskDriver)
  @JoinColumn({ name: "task_driver", referencedColumnName: 'id' })
  taskDriver: TaskDriver;
}