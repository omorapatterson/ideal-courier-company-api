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
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-Task.dto';
import { ITask } from './interfaces/task.interface';
import { Task } from './Task.entity';
import { TaskService } from './Task.service';


@Controller('Tasks')
//@UseGuards(AuthGuard(), RolesGuard)
export class TaskController {

    constructor(private readonly taskService: TaskService) { }

    @Post()
    @Roles('expert')
    @UsePipes(new ValidationPipe())
    async create(@Body() task: CreateTaskDto) {
        return this.taskService.create(task)
            .then((task: Task) => {
                return this.getITask(task);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Put(':id')
    @Roles('expert')
    @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
    async update(@Param('id') id: string, @Body() task: UpdateTaskDto) {
        return this.taskService.update(id, task)
            .then((task: Task) => {
                return this.getITask(task);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Get(':id')
    async getUser(@Param('id') id: string) {
        return this.taskService.getTask(id)
            .then((task: Task) => {
                return this.getITask(task);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Get()
    @Roles('expert')
    async getUsers() {
        return this.taskService.getTasks()
            .then((tasks: Task[]) => {
                return tasks.map((task: Task) => {
                    return this.getITask(task);
                });
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Delete(':id')
    @Roles('expert')
    async delete(@Param('id') id: string) {
        return this.taskService.delete(id)
        .then((task: Task) => {
            return this.getITask(task);
        })
        .catch((error: ErrorResult) => {
            return ErrorManager.manageErrorResult(error);
        });
    }

    getITask(Task: Task): ITask {
        return {
            id: Task.id,
            name: Task.name,
            description: Task.description,
            createdAt: Task.createdAt,
            updatedAt: Task.updatedAt
        };
    }
}
