import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Company } from './company.entity';
import { CompanyRepository } from './company.repository';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ErrorResult, NotFoundResult, BadRequestResult, InternalServerErrorResult } from '../common/error-manager/errors';
import { ErrorCode } from '../common/error-manager/error-codes';
import { User } from '../user/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { FilterCompanyDto } from './dto/filter-company.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company)
        private readonly companyRepository: CompanyRepository,
        private readonly userService: UserService,
    ) { }

    async create(companyDto: CreateCompanyDto, userDto: CreateUserDto): Promise<Company> {
        return new Promise((resolve: (result: Company) => void, reject: (reason: ErrorResult) => void): void => {

            this.companyRepository.createCompany(companyDto).then((company: Company) => {
                resolve(company);
                this.userService.create(userDto, company.id).then((user: User) => {
                }).catch((error) => {
                    reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
                });
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });

        });
    }

    update(id: string, companyDto: UpdateCompanyDto): Promise<Company> {
        return new Promise((resolve: (result: Company) => void, reject: (reason: ErrorResult) => void): void => {
            this.companyRepository.getCompany(id).then((company: Company) => {
                if (!company) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no company with the specified ID!'));
                    return;
                }
                this.companyRepository.updateCompany(id, companyDto).then((company: Company) => {
                    resolve(company);
                }).catch((error) => {
                    reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
                });
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    async getCompany(id: string): Promise<Company> {
        return new Promise((resolve: (result: Company) => void, reject: (reason: ErrorResult) => void): void => {
            this.companyRepository.getCompany(id).then((company: Company) => {
                if (!company) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no company with the specified ID!'));
                    return;
                }
                resolve(company);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    getCompanies(user: User, filter: FilterCompanyDto): Promise<Company[]> {
        return new Promise((resolve: (result: Company[]) => void, reject: (reason: ErrorResult) => void): void => {
            this.companyRepository.getCompanies(user, filter).then((companies: Company[]) => {
                resolve(companies);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    delete(id: string): Promise<Company> {
        return new Promise((resolve: (result: Company) => void, reject: (reason: ErrorResult) => void): void => {
            this.companyRepository.getCompany(id).then((company: Company) => {
                if (!company) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no company with the specified ID!'));
                    return;
                }
                this.companyRepository.remove(company).then((company: Company) => {
                    if (!company) {
                        reject(new BadRequestResult(ErrorCode.UnknownError, 'It can not be eliminated!'));
                        return;
                    }
                    resolve(company);
                });
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }
}
