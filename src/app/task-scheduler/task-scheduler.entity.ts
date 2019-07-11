import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Task } from '../task/task.entity';

@Entity()
export class TaskScheduler {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable: true})
  repeatEach: number;

  @Column({nullable: true})
  intervalTime: string;

  @Column({nullable: true})
  monthOption: string;

  @Column({nullable: true})
  monday: number;

  @Column({nullable: true})
  tuesday: number;

  @Column({nullable: true})
  wednesday: number;

  @Column({nullable: true})
  thursday: number;

  @Column({nullable: true})
  friday: number;

  @Column({nullable: true})
  saturday: number;

  @Column({nullable: true})
  sunday: number;

  @Column({nullable: true})
  finish: string;
  
  @Column({nullable: true})
  finishDate: Date;

  @Column({nullable: true})
  finishAfterRepetitions: number;

  @Column({nullable: true})
  repetitions: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToOne(type => Task)
  @JoinColumn({ name: "task", referencedColumnName: 'id' })
  task: Task;
}