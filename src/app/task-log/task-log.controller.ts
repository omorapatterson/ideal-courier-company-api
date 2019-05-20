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
import { CreateTaskLogDto } from './dto/create-task-log.dto';
import { UpdateTaskLogDto } from './dto/update-task-log.dto';
import { ITaskLog } from './interfaces/task-log.interface';
import { TaskLog } from './task-log.entity';
import { TaskLogService } from './task-log.service';

@Controller('task-logs')
//@UseGuards(AuthGuard(), RolesGuard)
export class TaskLogController {

    constructor(private readonly taskLogService: TaskLogService) { }

    @Post()
    //@Roles('expert')
    @UsePipes(new ValidationPipe())
    async create(@Body() taskLog: CreateTaskLogDto){
        return this.taskLogService.create(taskLog)
        .then((taskLog: TaskLog) => {
            return this.getITaskLog(taskLog);
        })
        .catch((error: ErrorResult) => {
            return ErrorManager.manageErrorResult(error);
        });
    }

    @Put(':id')
    @Roles('expert')
    @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
    async update(@Param('id') id: string, @Body() user: UpdateTaskLogDto){
        return this.taskLogService.update(id, user)
        .then((taskLog: TaskLog) => {
            return this.getITaskLog(taskLog);
        })
        .catch((error: ErrorResult) => {
            return ErrorManager.manageErrorResult(error);
        });
    }

    @Get(':id')
    async getRole(@Param('id') id: string){
        return this.taskLogService.getTaskLog(id)
        .then((taskLog: TaskLog) => {
            return this.getITaskLog(taskLog);
        })
        .catch((error: ErrorResult) => {
            return ErrorManager.manageErrorResult(error);
        });
    }

    @Get()
    @Roles('expert')
    async getTaskLogs(){
        return this.taskLogService.getTaskLogs()
        .then((taskLogs: TaskLog[]) => {
            return taskLogs.map((taskLogs: TaskLog) => {
                return this.getITaskLog(taskLogs);
            });
        })
        .catch((error: ErrorResult) => {
            return ErrorManager.manageErrorResult(error);
        });
    }

    @Delete(':id')
    @Roles('expert')
    async delete(@Param('id') id: string){
        return this.taskLogService.delete(id)
        .then((taskLog: TaskLog) => {
            return this.getITaskLog(taskLog);
        })
        .catch((error: ErrorResult) => {
            return ErrorManager.manageErrorResult(error);
        });
    }

    getITaskLog(taskLog: TaskLog): ITaskLog {
        return {
            id: taskLog.id,
            name: taskLog.name,
            description: taskLog.description,           
            createdAt: taskLog.createdAt,
            updatedAt: taskLog.updatedAt
        };
    }
}
