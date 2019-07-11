import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { TaskDriverWaypointService } from './task-driver-waypoint.service';
import { TaskDriverWaypointController } from './task-driver-waypoint.controller';
import { TaskDriverWaypoint } from './task-driver-waypoint.entity';
import { TaskDriverWaypointRepository } from './task-driver-waypoint.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskDriverWaypoint, TaskDriverWaypointRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  providers: [
    TaskDriverWaypointService
  ],
  controllers: [TaskDriverWaypointController],
  exports: [
    TaskDriverWaypointService
  ]
})
export class taskDriverWaypointModule {}
