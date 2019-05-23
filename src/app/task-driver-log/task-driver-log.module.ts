import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { TaskDriverLogService } from './task-driver-log.service';
import { TaskDriverLogController } from './task-driver-log.controller';
import { TaskDriverLog } from './task-driver-log.entity';
import { TaskDriverLogRepository } from './task-driver-log.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskDriverLog, TaskDriverLogRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  providers: [
    TaskDriverLogService
  ],
  controllers: [TaskDriverLogController],
  exports: [
    TaskDriverLogService
  ]
})
export class TaskDriverLogModule {}
