import { Injectable, HttpException, HttpStatus, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { PermisionRepository } from './permision.repository';
import { Permision } from './permision.entity';
import { CreatePermisionDto } from './dto/permision.dto';
import { ConfigService } from '../common/config/config.service';
import { IPermision } from './interfaces/permision.interface';
import { UpdatePermisionDto } from './dto/update-permision.dto';
import { NotFoundResult, ErrorResult, BadRequestResult, InternalServerErrorResult } from '../common/error-manager/errors';
import { ErrorCode } from '../common/error-manager/error-codes';

@Injectable()
export class PermisionService {

    constructor(
        @InjectRepository(Permision)
        private readonly permisionRepository: PermisionRepository
    ) { }

    create(permisionDto: CreatePermisionDto): Promise<IPermision> {
        return new Promise((resolve: (result: IPermision) => void, reject: (reason: ErrorResult) => void): void => {
            this.permisionRepository.createPermision(permisionDto).then((permision: Permision) => {
                resolve(permision);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    update(id: string, permisionDto: UpdatePermisionDto): Promise<IPermision> {
        return new Promise((resolve: (result: IPermision) => void, reject: (reason: ErrorResult) => void): void => {
            this.permisionRepository.getPermision(id).then((permision: Permision) => {
                if (!permision) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no permision with the specified ID!'));
                    return;
                }

                this.permisionRepository.updatePermision(id, permisionDto).then((permision: Permision) => {
                    resolve(permision);
                });

            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    getPermision(id: string): Promise<IPermision> {
        return new Promise((resolve: (result: IPermision) => void, reject: (reason: ErrorResult) => void): void => {
            this.permisionRepository.getPermision(id).then((permision: Permision) => {
                if (!permision) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no role with the specified ID!'));
                    return;
                }
                resolve(permision);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    getPermisions(): Promise<IPermision[]> {
        return new Promise((resolve: (result: IPermision[]) => void, reject: (reason: ErrorResult) => void): void => {
            this.permisionRepository.getPermisions().then((permisions: Permision[]) => {
                resolve(permisions);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    delete(id: string): Promise<IPermision> {
        return new Promise((resolve: (result: IPermision) => void, reject: (reason: ErrorResult) => void): void => {
            this.permisionRepository.getPermision(id).then((permision: Permision) => {
                if (!permision) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no permision with the specified ID!'));
                    return;
                }
                this.permisionRepository.remove(permision).then((permision: Permision) => {
                    if (!permision) {
                        reject(new BadRequestResult(ErrorCode.UnknownError, 'It can not be eliminated!'));
                        return;
                    }
                    resolve(permision);
                });
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }
   
}
