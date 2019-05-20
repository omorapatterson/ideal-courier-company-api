import { Test, TestingModule } from '@nestjs/testing';
import { PermisionController } from './permision.controller';

describe('Permision Controller', () => {
  let controller: PermisionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermisionController],
    }).compile();

    controller = module.get<PermisionController>(PermisionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
