import { Injectable, HttpException, HttpStatus, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { PlanRepository } from './plan.repository';
import { Plan } from './plan.entity';
import { CreatePlanDto } from './dto/create-plan.dto';
import { ConfigService } from '../common/config/config.service';
import { IPlan } from './interfaces/plan.interface';
import { UpdatePlanDto } from './dto/update-role.dto';
import { NotFoundResult, ErrorResult, BadRequestResult, InternalServerErrorResult } from '../common/error-manager/errors';
import { ErrorCode } from '../common/error-manager/error-codes';

@Injectable()
export class PlanService {

    constructor(
        @InjectRepository(Plan)
        private readonly planRepository: PlanRepository
    ) { }

    create(planDto: CreatePlanDto): Promise<IPlan> {
        return new Promise((resolve: (result: IPlan) => void, reject: (reason: ErrorResult) => void): void => {
            this.planRepository.createPlan(planDto).then((plan: Plan) => {
                resolve(plan);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    update(id: string, planDto: UpdatePlanDto): Promise<IPlan> {
        return new Promise((resolve: (result: IPlan) => void, reject: (reason: ErrorResult) => void): void => {
            this.planRepository.getRole(id).then((plan: Plan) => {
                if (!plan) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no plan with the specified ID!'));
                    return;
                }
                this.planRepository.updatePlan(id, planDto).then((plan: Plan) => {
                    resolve(plan);
                });

            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    getPlan(id: string): Promise<IPlan> {
        return new Promise((resolve: (result: IPlan) => void, reject: (reason: ErrorResult) => void): void => {
            this.planRepository.getRole(id).then((plan: Plan) => {
                if (!plan) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no plan with the specified ID!'));
                    return;
                }
                resolve(plan);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    getPlans(): Promise<IPlan[]> {
        return new Promise((resolve: (result: IPlan[]) => void, reject: (reason: ErrorResult) => void): void => {
            this.planRepository.getRoles().then((plans: Plan[]) => {
                resolve(plans);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    delete(id: string): Promise<IPlan> {
        return new Promise((resolve: (result: IPlan) => void, reject: (reason: ErrorResult) => void): void => {
            this.planRepository.getRole(id).then((plan: Plan) => {
                if (!plan) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no plan with the specified ID!'));
                    return;
                }
                this.planRepository.remove(plan).then((plan: Plan) => {
                    if (!plan) {
                        reject(new BadRequestResult(ErrorCode.UnknownError, 'It can not be eliminated!'));
                        return;
                    }
                    resolve(plan);
                });
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }   
}
