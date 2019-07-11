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
import { GetUser } from '../common/decorator/user.decorator';
import { Task } from '../task/task.entity';
import { User } from '../user/user.entity';
import { CreateTaskDriverDto, CreateTaskWithSchedulerDto } from './dto/create-task-driver.dto';
import { UpdateTaskDriverDto } from './dto/update-task-driver.dto';
import { ITaskDriver } from './interfaces/task-driver.interface';
import { TaskDriver } from './task-driver.entity';
import { TaskDriverService } from './task-driver.service';

@Controller('tasks')
@UseGuards(AuthGuard(), RolesGuard)
export class TaskDriverController {

    constructor(private readonly taskDriverService: TaskDriverService) { }

    @Post()
    //@Roles('expert')
    @UsePipes(new ValidationPipe())
    async create(@GetUser() user: User, @Body() task: Task) {
        return this.taskDriverService.create(user, task)
            .then((task: TaskDriver) => {
                return this.getITaskDriver(task);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Put(':id')
    @Roles('expert')
    @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
    async update(@Param('id') id: string, @Body() task: UpdateTaskDriverDto) {
        return this.taskDriverService.update(id, task)
            .then((task: TaskDriver) => {
                return this.getITaskDriver(task);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Get(':id')
    async getTaskDriver(@Param('id') id: string) {
        return this.taskDriverService.getTaskDriver(id)
            .then((task: TaskDriver) => {
                return this.getITaskDriver(task);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Get()
    //@Roles('expert')
    async getTaskDrivers(@GetUser() user: User) {
        return this.taskDriverService.getTaskDrivers(user)
            .then((tasks: TaskDriver[]) => {
                return {
                    data: tasks.map((task: TaskDriver) => {
                        return this.getITaskDriver(task);
                    })
                }
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Delete(':id')
    @Roles('expert')
    async delete(@Param('id') id: string) {
        return this.taskDriverService.delete(id)
            .then((task: TaskDriver) => {
                return this.getITaskDriver(task);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    getITaskDriver(taskDriver: TaskDriver): ITaskDriver {
        return {
            id: taskDriver.id,
            companyId: taskDriver.company.id,
            description: taskDriver.description,
            comments: taskDriver.comments,
            ipAddress: taskDriver.ipAddress,
            lat: taskDriver.lat,
            lon: taskDriver.lon,
            pieces: taskDriver.pieces,
            taskDate: taskDriver.taskDate,
            transType: taskDriver.description,
            createdAt: taskDriver.createdAt,
            updatedAt: taskDriver.updatedAt,
            scheduler: taskDriver.sheduler
        };
    }
}
