import { Test, TestingModule } from '@nestjs/testing';
import { StopRouteController } from './stop-route.controller';

describe('Role Controller', () => {
  let controller: StopRouteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StopRouteController],
    }).compile();

    controller = module.get<StopRouteController>(StopRouteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
