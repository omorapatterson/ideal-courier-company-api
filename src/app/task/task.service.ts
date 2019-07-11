import { Injectable, HttpException, HttpStatus, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { TaskDriverService } from '../task-driver/task-driver.service';

import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { User } from '../user/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { CreateSchedulerDto } from '../task-scheduler/dto/create-task-scheduler.dto'
import { TaskScheduler } from '../task-scheduler/task-scheduler.entity'
import { TaskSchedulerService } from '../task-scheduler/task-scheduler.service'
import { ConfigService } from '../common/config/config.service';
import { ITask } from './interfaces/task.interface';
import { UpdateTaskDto } from './dto/update-task.dto';
import { NotFoundResult, ErrorResult, BadRequestResult, InternalServerErrorResult } from '../common/error-manager/errors';
import { ErrorCode } from '../common/error-manager/error-codes';

import * as moment from 'moment';

@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: TaskRepository,
        private readonly taskDriverService: TaskDriverService,
        private readonly taskSchedulerService: TaskSchedulerService,
    ) { }

    create(user: User, taskDto: CreateTaskDto, scheduler: CreateSchedulerDto): Promise<ITask> {
        return new Promise((resolve: (result: ITask) => void, reject: (reason: ErrorResult) => void): void => {
            this.taskSchedulerService.create(scheduler).then((taskScheduler: TaskScheduler) => {
                this.taskRepository.createTask(user, taskDto, taskScheduler.id).then((task: Task) => {
                    this.createAllFutureTasks(user, task);
                    resolve(task);
                })/*.catch((error) => {
                    reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
                });*/
            })/*.catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });*/
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

    getTasks(user: User): Promise<ITask[]> {
        return new Promise((resolve: (result: ITask[]) => void, reject: (reason: ErrorResult) => void): void => {
            this.taskRepository.getTasks(user).then((tasks: Task[]) => {
                tasks.forEach(task => {
                    this.getAllTaskFutureTasks(task);
                });
                resolve(tasks);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    getActiveTasks(user: User): Promise<ITask[]> {
        return new Promise((resolve: (result: ITask[]) => void, reject: (reason: ErrorResult) => void): void => {
            this.taskRepository.getTasks(user).then((tasks: Task[]) => {
                resolve(tasks);
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

    createShedulerTask() {
        console.log('executing cron job');
        /*let allTasks: Task[];
        this.taskRepository.getTasks().then((tasks: Task[]) => {
            allTasks = tasks;
        }).catch((error) => {
        });
        allTasks.forEach(task => {
            console.log(task.id);
            this.taskSchedulerService.getTaskSchedulerByTaskId(task.id);
            
        });*/
    }

    getAllTaskFutureTasks(task: Task) {
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

    createAllFutureTasks(user: User, task: Task) {       
        let repetitions = 0;
        let startDate = moment(task.taskDate);
        let date = moment();
        let lastDayOfYear = moment(date.year() + '-12-31', 'YYYY-MM-DD');
        if (task.sheduler.intervalTime = 'week') {
            while (startDate <= lastDayOfYear) {                
                console.log(startDate);
                startDate.add(1, 'days').calendar();
                //this.taskDriverService.create(user, task).then((taskDriver: ITask) => {})
            }
        }
    }

    getAllTasks(user: User, task: Task) {        
        let repetitions = 0;
        let startDate = moment(task.taskDate);
        let date = moment();
        let lastDayOfYear = moment(date.year() + '-12-31', 'YYYY-MM-DD');
        if (task.sheduler.intervalTime = 'week') {
            while (startDate <= lastDayOfYear) {                
                console.log(startDate);
                startDate.add(1, 'days').calendar();
                //this.taskDriverService.create(user, task).then((taskDriver: ITask) => {})
            }
        }
    }
}