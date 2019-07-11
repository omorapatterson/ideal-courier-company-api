import { Injectable, HttpException, HttpStatus, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { TaskDriverRepository } from './task-driver.repository';
import { TaskDriver } from './task-driver.entity';
import { Task } from '../task/task.entity';
import { User } from '../user/user.entity';
import { TaskScheduler } from '../task-scheduler/task-scheduler.entity'
import { CreateTaskDriverDto, CreateTaskWithSchedulerDto } from './dto/create-task-driver.dto';
import { ConfigService } from '../common/config/config.service';
import { ITaskDriver } from './interfaces/task-driver.interface';
import { UpdateTaskDriverDto } from './dto/update-task-driver.dto';
import { NotFoundResult, ErrorResult, BadRequestResult, InternalServerErrorResult } from '../common/error-manager/errors';
import { ErrorCode } from '../common/error-manager/error-codes';
import { CreateSchedulerDto } from '../task-scheduler/dto/create-task-scheduler.dto'
import { TaskSchedulerService } from '../task-scheduler/task-scheduler.service'

import * as moment from 'moment';


@Injectable()
export class TaskDriverService {

    constructor(
        @InjectRepository(TaskDriver)
        private readonly taskDriverRepository: TaskDriverRepository,
        private readonly taskSchedulerService: TaskSchedulerService,
    ) { }

    create(user: User, task: Task): Promise<ITaskDriver> {
        return new Promise((resolve: (result: ITaskDriver) => void, reject: (reason: ErrorResult) => void): void => {
                this.taskDriverRepository.createTaskDriver(user, task).then((task: TaskDriver) => {
                    //this.createAllFutureTaskDrivers(user, task);
                    resolve(task);
                })/*.catch((error) => {
                    reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
                });*/            
        });
    }

    update(id: string, taskDto: UpdateTaskDriverDto): Promise<ITaskDriver> {
        return new Promise((resolve: (result: ITaskDriver) => void, reject: (reason: ErrorResult) => void): void => {
            this.taskDriverRepository.getTaskDriver(id).then((task: TaskDriver) => {
                if (!task) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no task with the specified ID!'));
                    return;
                }

                this.taskDriverRepository.updateTaskDriver(id, taskDto).then((task: TaskDriver) => {
                    resolve(task);
                });

            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    getTaskDriver(id: string): Promise<ITaskDriver> {
        return new Promise((resolve: (result: ITaskDriver) => void, reject: (reason: ErrorResult) => void): void => {
            this.taskDriverRepository.getTaskDriver(id).then((task: ITaskDriver) => {
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

    getTaskDrivers(user: User): Promise<ITaskDriver[]> {
        return new Promise((resolve: (result: ITaskDriver[]) => void, reject: (reason: ErrorResult) => void): void => {
            this.taskDriverRepository.getTaskDrivers(user).then((tasks: TaskDriver[]) => {
                tasks.forEach(task => {
                    this.getAllTaskDriverFutureTaskDrivers(task);
                });
                resolve(tasks);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    getActiveTaskDrivers(user: User): Promise<ITaskDriver[]> {
        return new Promise((resolve: (result: ITaskDriver[]) => void, reject: (reason: ErrorResult) => void): void => {
            this.taskDriverRepository.getTaskDrivers(user).then((tasks: TaskDriver[]) => {
                resolve(tasks);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    delete(id: string): Promise<ITaskDriver> {
        return new Promise((resolve: (result: ITaskDriver) => void, reject: (reason: ErrorResult) => void): void => {
            this.taskDriverRepository.getTaskDriver(id).then((task: TaskDriver) => {
                if (!task) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no task with the specified ID!'));
                    return;
                }
                this.taskDriverRepository.remove(task).then((task: TaskDriver) => {
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

    createShedulerTaskDriver() {
        console.log('executing cron job');
        /*let allTaskDrivers: TaskDriver[];
        this.taskDriverRepository.getTaskDrivers().then((tasks: TaskDriver[]) => {
            allTaskDrivers = tasks;
        }).catch((error) => {
        });
        allTaskDrivers.forEach(task => {
            console.log(task.id);
            this.taskSchedulerService.getTaskDriverSchedulerByTaskDriverId(task.id);
            
        });*/
    }

    getAllTaskDriverFutureTaskDrivers(task: TaskDriver) {
        let repetitions = 0;
        let date = moment();
        let lastDayOfYear = moment(date.year() + '-12-31', 'YYYY-MM-DD');
        if (task.sheduler.intervalTime = 'week') {
            while (date < lastDayOfYear) {
                date.add(1, 'days').calendar();
                console.log(date);
            }
        }
    }

    createAllFutureTaskDrivers() {
        console.log("lalalalalala");
        //this.taskDriverService.createTaskDriverDriver();
       /* this.taskDriverService.create(user, task, "null").then((taskDriver: ITaskDriverDriver) => {
        })*/
        /*let repetitions = 0;
        let date = moment();
        let lastDayOfYear = moment(date.year() + '-12-31', 'YYYY-MM-DD');
        if (task.sheduler.intervalTime = 'week') {
            while (date < lastDayOfYear) {
                date.add(1, 'days').calendar();
                console.log(date);
            }
        }*/
    }

    testFunction(){
        console.log("TaskDriverService");
    }
}
