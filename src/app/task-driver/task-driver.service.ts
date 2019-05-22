import { Injectable, HttpException, HttpStatus, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { TaskDriverRepository } from './task-driver.repository';
import { TaskDriver } from './task-driver.entity';
import { CreateTaskDriverDto } from './dto/create-task-driver.dto';
import { ConfigService } from '../common/config/config.service';
import { ITaskDriver } from './interfaces/task-driver.interface';
import { UpdateTaskDriverDto } from './dto/update-task-driver.dto';
import { NotFoundResult, ErrorResult, BadRequestResult, InternalServerErrorResult } from '../common/error-manager/errors';
import { ErrorCode } from '../common/error-manager/error-codes';

@Injectable()
export class TaskDriverService {

    constructor(
        @InjectRepository(TaskDriver)
        private readonly taskDriverRepository: TaskDriverRepository
    ) { }

    create(taskDriverDto: CreateTaskDriverDto): Promise<ITaskDriver> {
        return new Promise((resolve: (result: ITaskDriver) => void, reject: (reason: ErrorResult) => void): void => {
            this.taskDriverRepository.createtaskDriver(taskDriverDto).then((taskDriver: TaskDriver) => {
                resolve(taskDriver);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    update(id: string, taskDriverDto: UpdateTaskDriverDto): Promise<ITaskDriver> {
        return new Promise((resolve: (result: ITaskDriver) => void, reject: (reason: ErrorResult) => void): void => {
            this.taskDriverRepository.gettaskDriver(id).then((taskDriver: TaskDriver) => {
                if (!taskDriver) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no taskDriver with the specified ID!'));
                    return;
                }

                this.taskDriverRepository.updatetaskDriver(id, taskDriver).then((taskDriver: TaskDriver) => {
                    resolve(taskDriver);
                });

            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    gettaskDriver(id: string): Promise<ITaskDriver> {
        return new Promise((resolve: (result: ITaskDriver) => void, reject: (reason: ErrorResult) => void): void => {
            this.taskDriverRepository.gettaskDriver(id).then((taskDriver: ITaskDriver) => {
                if (!taskDriver) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no taskDriver with the specified ID!'));
                    return;
                }
                resolve(taskDriver);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    gettaskDrivers(): Promise<ITaskDriver[]> {
        return new Promise((resolve: (result: ITaskDriver[]) => void, reject: (reason: ErrorResult) => void): void => {
            this.taskDriverRepository.gettaskDrivers().then((taskDriver: TaskDriver[]) => {
                resolve(taskDriver);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    delete(id: string): Promise<ITaskDriver> {
        return new Promise((resolve: (result: ITaskDriver) => void, reject: (reason: ErrorResult) => void): void => {
            this.taskDriverRepository.gettaskDriver(id).then((taskDriver: TaskDriver) => {
                if (!taskDriver) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no taskDriver with the specified ID!'));
                    return;
                }
                this.taskDriverRepository.remove(taskDriver).then((taskDriver: TaskDriver) => {
                    if (!taskDriver) {
                        reject(new BadRequestResult(ErrorCode.UnknownError, 'It can not be eliminated!'));
                        return;
                    }
                    resolve(taskDriver);
                });
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }   
}
