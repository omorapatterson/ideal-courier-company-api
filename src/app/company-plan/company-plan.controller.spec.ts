import { Test, TestingModule } from '@nestjs/testing';
import { CompanyPlanController } from './company-plan.controller';

describe('ActivitySector Controller', () => {
  let controller: CompanyPlanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyPlanController],
    }).compile();

    controller = module.get<CompanyPlanController>(CompanyPlanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
