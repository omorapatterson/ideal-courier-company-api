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
            return this.getItaskLog(taskLog);
        })
        .catch((error: ErrorResult) => {
            return ErrorManager.manageErrorResult(error);
        });
    }

    @Put(':id')
    @Roles('expert')
    @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
    async update(@Param('id') id: string, @Body() taskLogs: UpdateTaskLogDto){
        return this.taskLogService.update(id, taskLogs)
        .then((taskLog: TaskLog) => {
            return this.getItaskLog(taskLog);
        })
        .catch((error: ErrorResult) => {
            return ErrorManager.manageErrorResult(error);
        });
    }

    @Get(':id')
    async getRole(@Param('id') id: string){
        return this.taskLogService.gettaskLog(id)
        .then((taskLog: TaskLog) => {
            return this.getItaskLog(taskLog);
        })
        .catch((error: ErrorResult) => {
            return ErrorManager.manageErrorResult(error);
        });
    }

    @Get()
    @Roles('expert')
    async gettaskLogs(){
        return this.taskLogService.gettaskLogs()
        .then((taskLogs: TaskLog[]) => {
            return taskLogs.map((taskLogs: TaskLog) => {
                return this.getItaskLog(taskLogs);
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
            return this.getItaskLog(taskLog);
        })
        .catch((error: ErrorResult) => {
            return ErrorManager.manageErrorResult(error);
        });
    }

    getItaskLog(taskLog: TaskLog): ITaskLog {
        return {
            id: taskLog.id,
            comments: taskLog.comments,
            ipAddress: taskLog.ipAddress,
            lat: taskLog.lat,
            lon: taskLog.lon,
            pieces: taskLog.pieces,
            taskDate: taskLog.taskDate,
            transType: taskLog.transType,
            description: taskLog.description,           
            createdAt: taskLog.createdAt,
            updatedAt: taskLog.updatedAt
        };
    }
}
