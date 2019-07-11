import { Test, TestingModule } from '@nestjs/testing';
import { TaskDriverController } from './task-driver.controller';

describe('Role Controller', () => {
  let controller: TaskDriverController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskDriverController],
    }).compile();

    controller = module.get<TaskDriverController>(TaskDriverController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
