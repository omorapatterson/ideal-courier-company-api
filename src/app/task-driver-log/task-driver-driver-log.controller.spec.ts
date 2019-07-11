import { Test, TestingModule } from '@nestjs/testing';
import { TaskDriverLogController } from './task-driver-log.controller';

describe('TaskDriverLog Controller', () => {
  let controller: TaskDriverLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskDriverLogController],
    }).compile();

    controller = module.get<TaskDriverLogController>(TaskDriverLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
