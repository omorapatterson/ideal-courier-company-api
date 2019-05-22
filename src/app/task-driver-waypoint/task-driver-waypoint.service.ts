import { Injectable, HttpException, HttpStatus, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TaskDriverWaypointRepository } from './task-driver-waypoint.repository';
import { TaskDriverWaypoint } from './task-driver-waypoint.entity';
import { CreateTaskDriverWaypointDto } from './dto/create-task-driver-waypoint.dto';
import { ITaskDriverWaypoint } from './interfaces/task-driver-waypoint.interface';
import { UpdateTaskDriverWaypointDto } from './dto/update-task-driver-waypoint.dto';
import { NotFoundResult, ErrorResult, BadRequestResult, InternalServerErrorResult } from '../common/error-manager/errors';
import { ErrorCode } from '../common/error-manager/error-codes';

@Injectable()
export class TaskDriverWaypointService {

    constructor(
        @InjectRepository(TaskDriverWaypoint)
        private readonly taskDriverWaypointRepository: TaskDriverWaypointRepository
    ) { }

    create(taskDriverWaypointDto: CreateTaskDriverWaypointDto): Promise<ITaskDriverWaypoint> {
        return new Promise((resolve: (result: ITaskDriverWaypoint) => void, reject: (reason: ErrorResult) => void): void => {
            this.taskDriverWaypointRepository.createtaskDriverWaypoint(taskDriverWaypointDto).then((taskDriverWaypoint: TaskDriverWaypoint) => {
                resolve(taskDriverWaypoint);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    update(id: string, taskDriverWaypointDto: UpdateTaskDriverWaypointDto): Promise<ITaskDriverWaypoint> {
        return new Promise((resolve: (result: ITaskDriverWaypoint) => void, reject: (reason: ErrorResult) => void): void => {
            this.taskDriverWaypointRepository.gettaskDriverWaypoint(id).then((taskDriverWaypoint: TaskDriverWaypoint) => {
                if (!taskDriverWaypoint) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no taskDriverWaypoint with the specified ID!'));
                    return;
                }

                this.taskDriverWaypointRepository.updatetaskDriverWaypoint(id, taskDriverWaypoint).then((taskDriverWaypoint: TaskDriverWaypoint) => {
                    resolve(taskDriverWaypoint);
                });

            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    gettaskDriverWaypoint(id: string): Promise<ITaskDriverWaypoint> {
        return new Promise((resolve: (result: ITaskDriverWaypoint) => void, reject: (reason: ErrorResult) => void): void => {
            this.taskDriverWaypointRepository.gettaskDriverWaypoint(id).then((taskDriverWaypoint: ITaskDriverWaypoint) => {
                if (!taskDriverWaypoint) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no taskDriverWaypoint with the specified ID!'));
                    return;
                }
                resolve(taskDriverWaypoint);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    gettaskDriverWaypoints(): Promise<ITaskDriverWaypoint[]> {
        return new Promise((resolve: (result: ITaskDriverWaypoint[]) => void, reject: (reason: ErrorResult) => void): void => {
            this.taskDriverWaypointRepository.gettaskDriverWaypoints().then((taskDriverWaypoint: TaskDriverWaypoint[]) => {
                resolve(taskDriverWaypoint);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    delete(id: string): Promise<ITaskDriverWaypoint> {
        return new Promise((resolve: (result: ITaskDriverWaypoint) => void, reject: (reason: ErrorResult) => void): void => {
            this.taskDriverWaypointRepository.gettaskDriverWaypoint(id).then((taskDriverWaypoint: TaskDriverWaypoint) => {
                if (!taskDriverWaypoint) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no taskDriverWaypoint with the specified ID!'));
                    return;
                }
                this.taskDriverWaypointRepository.remove(taskDriverWaypoint).then((taskDriverWaypoint: TaskDriverWaypoint) => {
                    if (!taskDriverWaypoint) {
                        reject(new BadRequestResult(ErrorCode.UnknownError, 'It can not be eliminated!'));
                        return;
                    }
                    resolve(taskDriverWaypoint);
                });
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }   
}
