import { Injectable, HttpException, HttpStatus, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { TaskLogRepository } from './task-log.repository';
import { TaskLog } from './task-log.entity';
import { CreateTaskLogDto } from './dto/create-task-log.dto';
import { ConfigService } from '../common/config/config.service';
import { ITaskLog } from './interfaces/task-log.interface';
import { UpdateTaskLogDto } from './dto/update-task-log.dto';
import { NotFoundResult, ErrorResult, BadRequestResult, InternalServerErrorResult } from '../common/error-manager/errors';
import { ErrorCode } from '../common/error-manager/error-codes';

@Injectable()
export class TaskLogService {

    constructor(
        @InjectRepository(TaskLog)
        private readonly taskLogRepository: TaskLogRepository
    ) { }

    create(taskLogDto: CreateTaskLogDto): Promise<ITaskLog> {
        return new Promise((resolve: (result: ITaskLog) => void, reject: (reason: ErrorResult) => void): void => {
            this.taskLogRepository.createtaskLog(taskLogDto).then((taskLog: TaskLog) => {
                resolve(taskLog);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    update(id: string, taskLogDto: UpdateTaskLogDto): Promise<ITaskLog> {
        return new Promise((resolve: (result: ITaskLog) => void, reject: (reason: ErrorResult) => void): void => {
            this.taskLogRepository.gettaskLog(id).then((taskLog: TaskLog) => {
                if (!taskLog) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no taskLog with the specified ID!'));
                    return;
                }

                this.taskLogRepository.updatetaskLog(id, taskLog).then((taskLog: TaskLog) => {
                    resolve(taskLog);
                });

            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    gettaskLog(id: string): Promise<ITaskLog> {
        return new Promise((resolve: (result: ITaskLog) => void, reject: (reason: ErrorResult) => void): void => {
            this.taskLogRepository.gettaskLog(id).then((taskLog: ITaskLog) => {
                if (!taskLog) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no taskLog with the specified ID!'));
                    return;
                }
                resolve(taskLog);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    gettaskLogs(): Promise<ITaskLog[]> {
        return new Promise((resolve: (result: ITaskLog[]) => void, reject: (reason: ErrorResult) => void): void => {
            this.taskLogRepository.gettaskLogs().then((taskLog: TaskLog[]) => {
                resolve(taskLog);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    delete(id: string): Promise<ITaskLog> {
        return new Promise((resolve: (result: ITaskLog) => void, reject: (reason: ErrorResult) => void): void => {
            this.taskLogRepository.gettaskLog(id).then((taskLog: TaskLog) => {
                if (!taskLog) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no taskLog with the specified ID!'));
                    return;
                }
                this.taskLogRepository.remove(taskLog).then((taskLog: TaskLog) => {
                    if (!taskLog) {
                        reject(new BadRequestResult(ErrorCode.UnknownError, 'It can not be eliminated!'));
                        return;
                    }
                    resolve(taskLog);
                });
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }   
}
