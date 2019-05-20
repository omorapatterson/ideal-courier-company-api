import { Controller, Post, Put, Get, Delete, UseGuards, UsePipes, Body, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
//
import { RolesGuard } from '../common/auth/guards/roles.guard';
import { ErrorManager } from '../common/error-manager/error-manager';
import { ErrorResult } from '../common/error-manager/errors';
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { Roles } from '../common/decorator/roles.decorator';
//
import { CompanyPlanService } from './company-plan.service';
import { CompanyPlan } from './company-plan.entity';
import { CreateCompanyPlanDto } from './dto/create-company-plan.dto';
import { UpdateCompanyPlanDto } from './dto/update-company-plan.dto';
import { ICompanyPlan } from './interfaces/company-plan.interface';

@Controller('company-plans')
@UseGuards(AuthGuard(), RolesGuard)
export class CompanyPlanController {

    constructor(private readonly companyPlanService: CompanyPlanService) { }

    @Post()
    @Roles('expert')
    @UsePipes(new ValidationPipe())
    async create(@Body() companyPlan: CreateCompanyPlanDto) {
        return this.companyPlanService.create(companyPlan)
            .then((companyPlan: CompanyPlan) => {
                return this.getICompanyPlan(companyPlan);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Put(':id')
    @Roles('expert')
    @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
    async update(@Param('id') id: string, @Body() companyPlan: UpdateCompanyPlanDto) {
        return this.companyPlanService.update(id, companyPlan)
            .then((companyPlan: CompanyPlan) => {
                return this.getICompanyPlan(companyPlan);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Get(':id')
    async getCompanyPlan(@Param('id') id: string) {
        return this.companyPlanService.getCompanyPlan(id)
            .then((companyPlan: CompanyPlan) => {
                return this.getICompanyPlan(companyPlan);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Get()
    getCompanyPlans() {
        return this.companyPlanService.getCompanyPlans()
            .then((activitySectors: CompanyPlan[]) => {
                return activitySectors.map((companyPlan: CompanyPlan) => {
                    return this.getICompanyPlan(companyPlan);
                });
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Delete(':id')
    @Roles('expert')
    delete(@Param('id') id: string) {
        return this.companyPlanService.delete(id)
            .then((companyPlan: CompanyPlan) => {
                return this.getICompanyPlan(companyPlan);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    getICompanyPlan(companyPlan: CompanyPlan): ICompanyPlan {
        return {
            id: companyPlan.id,
            sector: companyPlan.sector,
            description: companyPlan.description,
            createdAt: companyPlan.createdAt,
            updatedAt: companyPlan.updatedAt,
        };
    }
}
