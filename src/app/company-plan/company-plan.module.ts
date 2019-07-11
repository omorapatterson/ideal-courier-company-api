import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompanyPlanController } from './company-plan.controller';
import { CompanyPlanService } from './company-plan.service';
import { CompanyPlan } from './company-plan.entity';
import { CompanyPlanRepository } from './company-plan.repository';
import { AuthModule } from '../common/auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([CompanyPlan, CompanyPlanRepository]),
        AuthModule,
    ],
    controllers: [CompanyPlanController],
    providers: [
        CompanyPlanService,
    ],
    exports: [
        CompanyPlanService,
    ]
})
export class CompanyPlanModule { }
