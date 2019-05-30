import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
//
import { TaskSchedulerModule } from '../task-scheduler/task-scheduler.module';
//
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, TaskRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TaskSchedulerModule
  ],
  providers: [
    TaskService
  ],
  controllers: [TaskController],
  exports: [
    TaskService
  ]
})
export class TaskModule {}
