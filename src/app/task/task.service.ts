import { Injectable, HttpException, HttpStatus, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { CreateSchedulerDto } from '../task-scheduler/dto/create-task-scheduler.dto'
import { TaskScheduler } from '../task-scheduler/task-scheduler.entity'
import { TaskSchedulerService } from '../task-scheduler/task-scheduler.service'
import { ConfigService } from '../common/config/config.service';
import { ITask } from './interfaces/task.interface';
import { UpdateTaskDto } from './dto/update-task.dto';
import { NotFoundResult, ErrorResult, BadRequestResult, InternalServerErrorResult } from '../common/error-manager/errors';
import { ErrorCode } from '../common/error-manager/error-codes';

@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: TaskRepository,
        private readonly taskSchedulerService: TaskSchedulerService,
    ) { }

    create(taskDto: CreateTaskDto, scheduler: CreateSchedulerDto): Promise<ITask> {
        return new Promise((resolve: (result: ITask) => void, reject: (reason: ErrorResult) => void): void => {
            this.taskRepository.createTask(taskDto).then((task: Task) => {
                resolve(task);
                this.taskSchedulerService.create(scheduler, task.id).then((taskScheduler: TaskScheduler) => {
                }).catch((error) => {
                    reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
                });
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    update(id: string, taskDto: UpdateTaskDto): Promise<ITask> {
        return new Promise((resolve: (result: ITask) => void, reject: (reason: ErrorResult) => void): void => {
            this.taskRepository.getTask(id).then((task: Task) => {
                if (!task) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no task with the specified ID!'));
                    return;
                }

                this.taskRepository.updateTask(id, taskDto).then((task: Task) => {
                    resolve(task);
                });

            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    getTask(id: string): Promise<ITask> {
        return new Promise((resolve: (result: ITask) => void, reject: (reason: ErrorResult) => void): void => {
            this.taskRepository.getTask(id).then((task: ITask) => {
                if (!task) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no task with the specified ID!'));
                    return;
                }
                resolve(task);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    getTasks(): Promise<ITask[]> {
        return new Promise((resolve: (result: ITask[]) => void, reject: (reason: ErrorResult) => void): void => {
            this.taskRepository.getTasks().then((roles: Task[]) => {
                resolve(roles);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    delete(id: string): Promise<ITask> {
        return new Promise((resolve: (result: ITask) => void, reject: (reason: ErrorResult) => void): void => {
            this.taskRepository.getTask(id).then((task: Task) => {
                if (!task) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no task with the specified ID!'));
                    return;
                }
                this.taskRepository.remove(task).then((task: Task) => {
                    if (!task) {
                        reject(new BadRequestResult(ErrorCode.UnknownError, 'It can not be eliminated!'));
                        return;
                    }
                    resolve(task);
                });
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }   
}
