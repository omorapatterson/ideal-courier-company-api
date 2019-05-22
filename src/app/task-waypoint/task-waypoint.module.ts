import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { TaskWaypointService } from './task-waypoint.service';
import { TaskWaypointController } from './task-waypoint.controller';
import { TaskWaypoint } from './task-waypoint.entity';
import { TaskWaypointRepository } from './task-waypoint.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskWaypoint, TaskWaypointRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  providers: [
    TaskWaypointService
  ],
  controllers: [TaskWaypointController],
  exports: [
    TaskWaypointService
  ]
})
export class TaskWaypointModule {}
