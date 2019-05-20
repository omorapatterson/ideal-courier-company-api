import { Test, TestingModule } from '@nestjs/testing';
import { TaskWaypointController } from './task-waypoint.controller';

describe('TaskWaypoint Controller', () => {
  let controller: TaskWaypointController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskWaypointController],
    }).compile();

    controller = module.get<TaskWaypointController>(TaskWaypointController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
