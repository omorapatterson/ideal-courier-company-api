import { Test, TestingModule } from '@nestjs/testing';
import { TaskLogController } from './task-log.controller';

describe('taskLog Controller', () => {
  let controller: TaskLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskLogController],
    }).compile();

    controller = module.get<TaskLogController>(TaskLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
