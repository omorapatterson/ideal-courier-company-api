import {
    Controller,
    Get,
    Post,
    Body,
    UseGuards,
    Put,
    Param,
    Delete,
    UsePipes
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
//
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { RolesGuard } from '../common/auth/guards/roles.guard';
import { Roles } from '../common/decorator/roles.decorator';
import { ErrorResult } from '../common/error-manager/errors';
import { ErrorManager } from '../common/error-manager/error-manager';
//
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-role.dto';
import { IPlan } from './interfaces/plan.interface';
import { Plan } from './plan.entity';
import { PlanService } from './plan.service';

@Controller('plans')
//@UseGuards(AuthGuard(), RolesGuard)
export class PlanController {

    constructor(private readonly planService: PlanService) { }

    @Post()
    //@Roles('expert')
    @UsePipes(new ValidationPipe())
    async create(@Body() role: CreatePlanDto) {
        return this.planService.create(role)
            .then((plan: Plan) => {
                return this.getIPlan(plan);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Put(':id')
    @Roles('expert')
    @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
    async update(@Param('id') id: string, @Body() plan: UpdatePlanDto) {
        return this.planService.update(id, plan)
            .then((plan: Plan) => {
                return this.getIPlan(plan);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Get(':id')
    async getRole(@Param('id') id: string) {
        return this.planService.getPlan(id)
            .then((plan: Plan) => {
                return this.getIPlan(plan);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Get()
    @Roles('expert')
    async getRoles() {
        return this.planService.getPlans()
        .then((plans: Plan[]) => {
            return plans.map((plan: Plan) => {
                return this.getIPlan(plan);
            });
        })
        .catch((error: ErrorResult) => {
            return ErrorManager.manageErrorResult(error);
        });
    }

    @Delete(':id')
    @Roles('expert')
    async delete(@Param('id') id: string) {
        return this.planService.delete(id)
            .then((plan: Plan) => {
                return this.getIPlan(plan);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    getIPlan(plan: Plan): IPlan {
        return {
            id: plan.id,
            name: plan.name,
            description: plan.description,
            createdAt: plan.createdAt,
            updatedAt: plan.updatedAt
        };
    }
}
