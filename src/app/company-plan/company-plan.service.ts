import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CompanyPlan } from './company-plan.entity';
import { CompanyPlanRepository } from './company-plan.repository';
import { CreateCompanyPlanDto } from './dto/create-company-plan.dto';
import { UpdateCompanyPlanDto } from './dto/update-company-plan.dto';
import { ErrorResult, NotFoundResult, BadRequestResult, InternalServerErrorResult } from '../common/error-manager/errors';
import { ErrorCode } from '../common/error-manager/error-codes';

@Injectable()
export class CompanyPlanService {
    constructor(
        @InjectRepository(CompanyPlan)
        private readonly companyPlanRepository: CompanyPlanRepository
    ) { }

    async create(companyPlanDto: CreateCompanyPlanDto): Promise<CompanyPlan> {
        return new Promise((resolve: (result: CompanyPlan) => void, reject: (reason: ErrorResult) => void): void => {
            this.companyPlanRepository.createCompanyPlan(companyPlanDto).then((companyPlan: CompanyPlan) => {
                resolve(companyPlan);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    update(id: string, companyPlanDto: UpdateCompanyPlanDto): Promise<CompanyPlan> {
        return new Promise((resolve: (result: CompanyPlan) => void, reject: (reason: ErrorResult) => void): void => {
            this.companyPlanRepository.getCompanyPlan(id).then((companyPlan: CompanyPlan) => {
                if (!companyPlan) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no company plan with the specified ID!'));
                    return;
                }
                this.companyPlanRepository.updateCompanyPlan(id, companyPlanDto).then((companyPlan: CompanyPlan) => {
                    resolve(companyPlan);
                });
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    async getCompanyPlan(id: string): Promise<CompanyPlan> {
        return new Promise((resolve: (result: CompanyPlan) => void, reject: (reason: ErrorResult) => void): void => {
            this.companyPlanRepository.getCompanyPlan(id).then((companyPlan: CompanyPlan) => {
                if (!companyPlan) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no company plan with the specified ID!'));
                    return;
                }
                resolve(companyPlan);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    getCompanyPlans(): Promise<CompanyPlan[]> {
        return new Promise((resolve: (result: CompanyPlan[]) => void, reject: (reason: ErrorResult) => void): void => {
            this.companyPlanRepository.getCompanyPlans().then((companyPlan: CompanyPlan[]) => {
                resolve(companyPlan);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    delete(id: string): Promise<CompanyPlan> {
        return new Promise((resolve: (result: CompanyPlan) => void, reject: (reason: ErrorResult) => void): void => {
            this.companyPlanRepository.getCompanyPlan(id).then((companyPlan: CompanyPlan) => {
                if (!companyPlan) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no activitySector with the specified ID!'));
                    return;
                }
                this.companyPlanRepository.remove(companyPlan).then((companyPlan: CompanyPlan) => {
                    if (!companyPlan) {
                        reject(new BadRequestResult(ErrorCode.UnknownError, 'It can not be eliminated!'));
                        return;
                    }
                    resolve(companyPlan);
                });
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }
}
