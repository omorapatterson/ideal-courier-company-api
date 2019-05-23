import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Task } from '../task/task.entity';

@Entity()
export class TaskScheduler {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  repeatEach: number;

  @Column()
  intervalTime: string;

  @Column()
  monthOption: string;

  @Column()
  monday: number;

  @Column()
  tuesday: number;

  @Column()
  wednesday: number;

  @Column()
  thursday: number;

  @Column()
  friday: number;

  @Column()
  saturday: number;

  @Column()
  sunday: number;

  @Column()
  finish: string;
  
  @Column()
  finishDate: Date;

  @Column()
  finishAfterRepetitions: number;

  @Column()
  repetitions: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToOne(type => Task)
  @JoinColumn({ name: "task", referencedColumnName: 'id' })
  task: Task;
}