import {
    Controller,
    Get,
    Post,
    Body,
    UseGuards,
    Put,
    Param,
    Delete,
    UsePipes
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
//
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { RolesGuard } from '../common/auth/guards/roles.guard';
import { Roles } from '../common/decorator/roles.decorator';
import { ErrorResult } from '../common/error-manager/errors';
import { ErrorManager } from '../common/error-manager/error-manager';
//
import { CreateSchedulerDto } from './dto/create-task-scheduler.dto';
import { UpdateSchedulerDto } from './dto/update-task-scheduler.dto';
import { ITaskScheduler } from './interfaces/task-scheduler.interface';
import { TaskScheduler } from './task-scheduler.entity';
import { TaskSchedulerService } from './task-scheduler.service';

@Controller('task-scheduler')
//@UseGuards(AuthGuard(), RolesGuard)
export class TaskSchedulerController {

    constructor(private taskSchedulerService: TaskSchedulerService) { }

    @Post()
    //@Roles('expert')
    @UsePipes(new ValidationPipe())
    async create(@Body() taskScheduler: CreateSchedulerDto) {
        return this.taskSchedulerService.create(taskScheduler)
            .then((taskScheduler: TaskScheduler) => {
                return this.getITaskScheduler(taskScheduler);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Put(':id')
    @Roles('expert')
    @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
    async update(@Param('id') id: string, @Body() taskScheduler: UpdateSchedulerDto) {
        return this.taskSchedulerService.update(id, taskScheduler)
            .then((taskScheduler: TaskScheduler) => {
                return this.getITaskScheduler(taskScheduler);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Get(':id')
    async getTaskScheduler(@Param('id') id: string) {
        return this.taskSchedulerService.getTaskScheduler(id)
            .then((taskScheduler: TaskScheduler) => {
                return this.getITaskScheduler(taskScheduler);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Get()
    @Roles('expert')
    async getTaskSchedulers() {
        return this.taskSchedulerService.getTaskSchedulers()
            .then((taskSchedulers: TaskScheduler[]) => {
                return taskSchedulers.map((taskScheduler: TaskScheduler) => {
                    return this.getITaskScheduler(taskScheduler);
                });
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Delete(':id')
    @Roles('expert')
    async delete(@Param('id') id: string) {
        return this.taskSchedulerService.delete(id)
            .then((taskScheduler: TaskScheduler) => {
                return this.getITaskScheduler(taskScheduler);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    getITaskScheduler(taskScheduler: TaskScheduler): ITaskScheduler {
        return {
            id: taskScheduler.id,
            createdAt: taskScheduler.createdAt,
            intervalTime: taskScheduler.intervalTime,
            friday: taskScheduler.friday,
            finish: taskScheduler.finish,
            finishAfterRepetitions: taskScheduler.finishAfterRepetitions,
            finishDate: taskScheduler.finishDate,
            monday: taskScheduler.monday,
            monthOption: taskScheduler.monthOption,
            repeatEach: taskScheduler.repeatEach,
            repetitions: taskScheduler.repetitions,
            saturday: taskScheduler.friday,
            sunday: taskScheduler.sunday,
            tuesday: taskScheduler.tuesday,
            thursday: taskScheduler.thursday,
            updatedAt: taskScheduler.updatedAt,
            wednesday: taskScheduler.wednesday,
        };
    }
}
