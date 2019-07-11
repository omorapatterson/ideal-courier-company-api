import { Test, TestingModule } from '@nestjs/testing';
import { TaskSchedulerController } from './task-scheduler.controller';

describe('Role Controller', () => {
  let controller: TaskSchedulerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskSchedulerController],
    }).compile();

    controller = module.get<TaskSchedulerController>(TaskSchedulerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
