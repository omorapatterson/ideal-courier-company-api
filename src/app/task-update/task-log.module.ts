import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { TaskLogService } from './task-log.service';
import { TaskLogController } from './task-log.controller';
import { TaskLog } from './task-log.entity';
import { TaskLogRepository } from './task-log.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskLog, TaskLogRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  providers: [
    TaskLogService
  ],
  controllers: [TaskLogController],
  exports: [
    TaskLogService
  ]
})
export class taskLogModule {}
