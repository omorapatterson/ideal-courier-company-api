import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { TaskService } from './Task.service';
import { TaskController } from './Task.controller';
import { Task } from './Task.entity';
import { TaskRepository } from './task.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, TaskRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  providers: [
    TaskService
  ],
  controllers: [TaskController],
  exports: [
    TaskService
  ]
})
export class RoleModule {}
