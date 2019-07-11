import { Injectable, HttpException, HttpStatus, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { TaskSchedulerRepository } from './task-scheduler.repository';
import { TaskScheduler } from './task-scheduler.entity';
import { CreateSchedulerDto } from './dto/create-task-scheduler.dto';
import { ConfigService } from '../common/config/config.service';
import { ITaskScheduler } from './interfaces/task-scheduler.interface';
import { UpdateSchedulerDto } from './dto/update-task-scheduler.dto';
import { NotFoundResult, ErrorResult, BadRequestResult, InternalServerErrorResult } from '../common/error-manager/errors';
import { ErrorCode } from '../common/error-manager/error-codes';

@Injectable()
export class TaskSchedulerService {

    constructor(
        @InjectRepository(TaskScheduler)
        private readonly taskSchedulerRepository: TaskSchedulerRepository
    ) { }

    create(taskSchedulerDto: CreateSchedulerDto): Promise<ITaskScheduler> {
        return new Promise((resolve: (result: ITaskScheduler) => void, reject: (reason: ErrorResult) => void): void => {
            this.taskSchedulerRepository.createTaskScheduler(taskSchedulerDto).then((TaskScheduler: TaskScheduler) => {
                resolve(TaskScheduler);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    update(id: string, taskSchedulerDto: UpdateSchedulerDto): Promise<ITaskScheduler> {
        return new Promise((resolve: (result: ITaskScheduler) => void, reject: (reason: ErrorResult) => void): void => {
            this.taskSchedulerRepository.getTaskScheduler(id).then((TaskScheduler: TaskScheduler) => {
                if (!TaskScheduler) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no TaskScheduler with the specified ID!'));
                    return;
                }

                this.taskSchedulerRepository.updateTaskScheduler(id, taskSchedulerDto).then((taskScheduler: TaskScheduler) => {
                    resolve(taskScheduler);
                });

            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    getTaskScheduler(id: string): Promise<ITaskScheduler> {
        return new Promise((resolve: (result: ITaskScheduler) => void, reject: (reason: ErrorResult) => void): void => {
            this.taskSchedulerRepository.getTaskScheduler(id).then((taskScheduler: ITaskScheduler) => {
                if (!taskScheduler) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no TaskScheduler with the specified ID!'));
                    return;
                }
                resolve(taskScheduler);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    getTaskSchedulerByTaskId(taskId: string): TaskScheduler {

        this.taskSchedulerRepository.getTaskSchedulerByTaskId(taskId).then((taskScheduler: ITaskScheduler) => {
            if (!taskScheduler) {
                return taskScheduler;
            }
        }).catch((error) => {
            return null;
        });
        return null;
    }

    getTaskSchedulers(): Promise<ITaskScheduler[]> {
        return new Promise((resolve: (result: ITaskScheduler[]) => void, reject: (reason: ErrorResult) => void): void => {
            this.taskSchedulerRepository.getTaskSchedulers().then((taskSchedulers: TaskScheduler[]) => {
                resolve(taskSchedulers);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    delete(id: string): Promise<ITaskScheduler> {
        return new Promise((resolve: (result: ITaskScheduler) => void, reject: (reason: ErrorResult) => void): void => {
            this.taskSchedulerRepository.getTaskScheduler(id).then((taskScheduler: TaskScheduler) => {
                if (!TaskScheduler) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no TaskScheduler with the specified ID!'));
                    return;
                }
                this.taskSchedulerRepository.remove(taskScheduler).then((TaskScheduler: TaskScheduler) => {
                    if (!taskScheduler) {
                        reject(new BadRequestResult(ErrorCode.UnknownError, 'It can not be eliminated!'));
                        return;
                    }
                    resolve(TaskScheduler);
                });
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }
}
