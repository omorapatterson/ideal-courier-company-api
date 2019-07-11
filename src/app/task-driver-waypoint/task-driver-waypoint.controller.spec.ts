import { Test, TestingModule } from '@nestjs/testing';
import { TaskDriverWaypointController } from './task-driver-waypoint.controller';

describe('taskDriverWaypoint Controller', () => {
  let controller: TaskDriverWaypointController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskDriverWaypointController],
    }).compile();

    controller = module.get<TaskDriverWaypointController>(TaskDriverWaypointController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
