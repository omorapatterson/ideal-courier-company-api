import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { TaskDriverService } from './task-driver.service';
import { TaskDriverController } from './task-driver.controller';
import { TaskDriver } from './task-driver.entity';
import { TaskDriverRepository } from './task-driver.repository';
import { TaskSchedulerModule } from '../task-scheduler/task-scheduler.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([TaskDriver, TaskDriverRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TaskSchedulerModule
  ],
  providers: [
    TaskDriverService
  ],
  controllers: [TaskDriverController],
  exports: [
    TaskDriverService
  ]
})
export class TaskDriverModule {}
