import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { Plan } from './plan.entity';
import { PlanRepository } from './plan.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Plan, PlanRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  providers: [
    PlanService
  ],
  controllers: [PlanController],
  exports: [
    PlanService
  ]
})
export class PlanModule {}
