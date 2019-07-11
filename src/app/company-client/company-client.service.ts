import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CompanyClientRepository } from './company-client.repository';
import { CompanyClient } from './company-client.entity';
import { CreateCompanyClientDto } from './dto/create-company-client.dto';
import { UpdateCompanyClientDto } from './dto/update-company-client.dto';
import { NotFoundResult, ErrorResult, BadRequestResult, InternalServerErrorResult } from '../common/error-manager/errors';
import { ErrorCode } from '../common/error-manager/error-codes';

@Injectable()
export class CompanyClientService {

    constructor(
        @InjectRepository(CompanyClient)
        private readonly companyClientRepository: CompanyClientRepository
    ) { }

    create(companyClientDto: CreateCompanyClientDto): Promise<CompanyClient> {
        return new Promise((resolve: (result: CompanyClient) => void, reject: (reason: ErrorResult) => void): void => {
            this.companyClientRepository.getCompanyClientByEmail(companyClientDto.email).then((companyClient: CompanyClient) => {
                if (companyClient) {
                    reject(new BadRequestResult(ErrorCode.UnknownEntity, 'There is a user with same email!'));
                    return;
                }
                this.companyClientRepository.createCompanyClient(companyClientDto).then((companyClient: CompanyClient) => {
                    resolve(companyClient);
                });
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    update(id: string, userDto: UpdateCompanyClientDto): Promise<CompanyClient> {
        return new Promise((resolve: (result: CompanyClient) => void, reject: (reason: ErrorResult) => void): void => {
            this.companyClientRepository.getCompanyClient(id).then((companyClient: CompanyClient) => {
                if (!companyClient) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no CompanyClient with the specified ID!'));
                    return;
                }
                this.companyClientRepository.getCompanyClientByEmail(userDto.email).then((companyClient: CompanyClient) => {
                    if (companyClient && companyClient.id !== id) {
                        reject(new BadRequestResult(ErrorCode.UnknownEntity, 'There is a CompanyClient with same email!'));
                        return;
                    }
                    this.companyClientRepository.updateCompanyClient(id, userDto).then((companyClient: CompanyClient) => {
                        resolve(companyClient);
                    });
                });
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    getCompanyClient(id: string): Promise<CompanyClient> {
        return new Promise((resolve: (result: CompanyClient) => void, reject: (reason: ErrorResult) => void): void => {
            this.companyClientRepository.getCompanyClient(id).then((companyClient: CompanyClient) => {
                if (!companyClient) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no CompanyClient with the specified ID!'));
                    return;
                }
                resolve(companyClient);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    getCompanyClients(): Promise<CompanyClient[]> {
        return new Promise((resolve: (result: CompanyClient[]) => void, reject: (reason: ErrorResult) => void): void => {
            this.companyClientRepository.getCompanyClients().then((companyClients: CompanyClient[]) => {
                resolve(companyClients);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    delete(id: string): Promise<CompanyClient> {
        return new Promise((resolve: (result: CompanyClient) => void, reject: (reason: ErrorResult) => void): void => {
            this.companyClientRepository.getCompanyClient(id).then((companyClient: CompanyClient) => {
                if (!companyClient) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no CompanyClient with the specified ID!'));
                    return;
                }
                this.companyClientRepository.deleteUser(companyClient).then((companyClient: CompanyClient) => {
                    if (!companyClient) {
                        reject(new BadRequestResult(ErrorCode.UnknownError, 'It can not be eliminated!'));
                        return;
                    }
                    resolve(companyClient);
                });
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    getUserByEmail(email: string): Promise<CompanyClient> {
        return new Promise((resolve: (result: CompanyClient) => void, reject: (reason: ErrorResult) => void): void => {
            this.companyClientRepository.getCompanyClientByEmail(email).then((companyClient: CompanyClient) => {
                if (!companyClient) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no CompanyClient with the specified ID!'));
                    return;
                }
                resolve(companyClient);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }
}
