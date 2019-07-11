import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { TaskSchedulerService } from './task-scheduler.service';
import { TaskSchedulerController } from './task-scheduler.controller';
import { TaskScheduler } from './task-scheduler.entity';
import { TaskSchedulerRepository } from './task-scheduler.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskScheduler, TaskSchedulerRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  providers: [
    TaskSchedulerService
  ],
  controllers: [TaskSchedulerController],
  exports: [
    TaskSchedulerService
  ]
})
export class TaskSchedulerModule {}
