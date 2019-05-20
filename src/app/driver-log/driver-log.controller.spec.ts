import { Test, TestingModule } from '@nestjs/testing';
import { DriverLogController } from './driver-log.controller';

describe('DriverLog Controller', () => {
  let controller: DriverLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DriverLogController],
    }).compile();

    controller = module.get<DriverLogController>(DriverLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
