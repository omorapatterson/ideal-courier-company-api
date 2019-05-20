import { Injectable, HttpException, HttpStatus, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { TaskWaypointRepository } from './task-waypoint.repository';
import { TaskWaypoint } from './task-waypoint.entity';
import { CreateTaskWaypointDto } from './dto/create-task-waypoint.dto';
import { ConfigService } from '../common/config/config.service';
import { ITaskWaypoint } from './interfaces/task-waypoint.interface';
import { UpdateTaskWaypointDto } from './dto/update-task-waypoint.dto';
import { NotFoundResult, ErrorResult, BadRequestResult, InternalServerErrorResult } from '../common/error-manager/errors';
import { ErrorCode } from '../common/error-manager/error-codes';

@Injectable()
export class TaskWaypointService {

    constructor(
        @InjectRepository(TaskWaypoint)
        private readonly taskWaypointRepository: TaskWaypointRepository
    ) { }

    create(taskWaypointDto: CreateTaskWaypointDto): Promise<ITaskWaypoint> {
        return new Promise((resolve: (result: ITaskWaypoint) => void, reject: (reason: ErrorResult) => void): void => {
            this.taskWaypointRepository.createTaskWaypoint(taskWaypointDto).then((taskWaypointDto: TaskWaypoint) => {
                resolve(taskWaypointDto);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    update(id: string, taskWaypointDto: UpdateTaskWaypointDto): Promise<ITaskWaypoint> {
        return new Promise((resolve: (result: ITaskWaypoint) => void, reject: (reason: ErrorResult) => void): void => {
            this.taskWaypointRepository.getTaskWaypoint(id).then((taskWaypoint: TaskWaypoint) => {
                if (!taskWaypoint) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no TaskWaypoint with the specified ID!'));
                    return;
                }

                this.taskWaypointRepository.updateTaskWaypoint(id, taskWaypointDto).then((taskWaypoint: TaskWaypoint) => {
                    resolve(taskWaypoint);
                });

            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    getTaskWaypoint(id: string): Promise<ITaskWaypoint> {
        return new Promise((resolve: (result: ITaskWaypoint) => void, reject: (reason: ErrorResult) => void): void => {
            this.taskWaypointRepository.getTaskWaypoint(id).then((taskWaypoint: ITaskWaypoint) => {
                if (!TaskWaypoint) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no TaskWaypoint with the specified ID!'));
                    return;
                }
                resolve(taskWaypoint);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    getTaskWaypoints(): Promise<ITaskWaypoint[]> {
        return new Promise((resolve: (result: ITaskWaypoint[]) => void, reject: (reason: ErrorResult) => void): void => {
            this.taskWaypointRepository.getTaskWaypoints().then((taskWaypoint: TaskWaypoint[]) => {
                resolve(taskWaypoint);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    delete(id: string): Promise<ITaskWaypoint> {
        return new Promise((resolve: (result: ITaskWaypoint) => void, reject: (reason: ErrorResult) => void): void => {
            this.taskWaypointRepository.getTaskWaypoint(id).then((taskWaypoint: TaskWaypoint) => {
                if (!TaskWaypoint) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no TaskWaypoint with the specified ID!'));
                    return;
                }
                this.taskWaypointRepository.remove(taskWaypoint).then((taskWaypoint: TaskWaypoint) => {
                    if (!TaskWaypoint) {
                        reject(new BadRequestResult(ErrorCode.UnknownError, 'It can not be eliminated!'));
                        return;
                    }
                    resolve(taskWaypoint);
                });
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }   
}
