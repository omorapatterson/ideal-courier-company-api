import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { DriverLogService } from './driver-log.service';
import { DriverLogController } from './driver-log.controller';
import { DriverLog } from './driver-log.entity';
import { DriverLogRepository } from './driver-log.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([DriverLog, DriverLogRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  providers: [
    DriverLogService
  ],
  controllers: [DriverLogController],
  exports: [
    DriverLogService
  ]
})
export class DriverLogModule {}
