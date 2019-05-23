import { Injectable, HttpException, HttpStatus, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { TaskDriverLogRepository } from './task-driver-log.repository';
import { TaskDriverLog } from './task-driver-log.entity';
import { CreateTaskDriverLogDto } from './dto/create-task-driver-log.dto';
import { ConfigService } from '../common/config/config.service';
import { ITaskDriverLog } from './interfaces/task-driver-log.interface';
import { UpdateTaskDriverLogDto } from './dto/update-task-driver-log.dto';
import { NotFoundResult, ErrorResult, BadRequestResult, InternalServerErrorResult } from '../common/error-manager/errors';
import { ErrorCode } from '../common/error-manager/error-codes';

@Injectable()
export class TaskDriverLogService {

    constructor(
        @InjectRepository(TaskDriverLog)
        private readonly taskDriverLogRepository: TaskDriverLogRepository
    ) { }

    create(TaskDriverLogDto: CreateTaskDriverLogDto): Promise<ITaskDriverLog> {
        return new Promise((resolve: (result: ITaskDriverLog) => void, reject: (reason: ErrorResult) => void): void => {
            this.taskDriverLogRepository.createTaskDriverLog(TaskDriverLogDto).then((taskDriverLog: TaskDriverLog) => {
                resolve(taskDriverLog);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    update(id: string, TaskDriverLogDto: UpdateTaskDriverLogDto): Promise<ITaskDriverLog> {
        return new Promise((resolve: (result: ITaskDriverLog) => void, reject: (reason: ErrorResult) => void): void => {
            this.taskDriverLogRepository.getTaskDriverLog(id).then((taskDriverLog: TaskDriverLog) => {
                if (!taskDriverLog) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no TaskDriverLog with the specified ID!'));
                    return;
                }

                this.taskDriverLogRepository.updateTaskDriverLog(id, taskDriverLog).then((taskDriverLog: TaskDriverLog) => {
                    resolve(taskDriverLog);
                });

            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    getTaskDriverLog(id: string): Promise<ITaskDriverLog> {
        return new Promise((resolve: (result: ITaskDriverLog) => void, reject: (reason: ErrorResult) => void): void => {
            this.taskDriverLogRepository.getTaskDriverLog(id).then((taskDriverLog: ITaskDriverLog) => {
                if (!taskDriverLog) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no TaskDriverLog with the specified ID!'));
                    return;
                }
                resolve(taskDriverLog);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    getTaskDriverLogs(): Promise<ITaskDriverLog[]> {
        return new Promise((resolve: (result: ITaskDriverLog[]) => void, reject: (reason: ErrorResult) => void): void => {
            this.taskDriverLogRepository.getTaskDriverLogs().then((taskDriverLog: TaskDriverLog[]) => {
                resolve(taskDriverLog);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    delete(id: string): Promise<ITaskDriverLog> {
        return new Promise((resolve: (result: ITaskDriverLog) => void, reject: (reason: ErrorResult) => void): void => {
            this.taskDriverLogRepository.getTaskDriverLog(id).then((taskDriverLog: TaskDriverLog) => {
                if (!taskDriverLog) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no TaskDriverLog with the specified ID!'));
                    return;
                }
                this.taskDriverLogRepository.remove(taskDriverLog).then((taskDriverLog: TaskDriverLog) => {
                    if (!taskDriverLog) {
                        reject(new BadRequestResult(ErrorCode.UnknownError, 'It can not be eliminated!'));
                        return;
                    }
                    resolve(taskDriverLog);
                });
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }   
}
