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
import { CreateTaskDriverLogDto } from './dto/create-task-driver-log.dto';
import { UpdateTaskDriverLogDto } from './dto/update-task-driver-log.dto';
import { ITaskDriverLog } from './interfaces/task-driver-log.interface';
import { TaskDriverLog } from './task-driver-log.entity';
import { TaskDriverLogService } from './task-driver-log.service';

@Controller('task-DriverLogs')
//@UseGuards(AuthGuard(), RolesGuard)
export class TaskDriverLogController {

    constructor(private readonly taskDriverLogService: TaskDriverLogService) { }

    @Post()
    //@Roles('expert')
    @UsePipes(new ValidationPipe())
    async create(@Body() taskDriverLog: CreateTaskDriverLogDto){
        return this.taskDriverLogService.create(taskDriverLog)
        .then((taskDriverLog: TaskDriverLog) => {
            return this.getITaskDriverLog(taskDriverLog);
        })
        .catch((error: ErrorResult) => {
            return ErrorManager.manageErrorResult(error);
        });
    }

    @Put(':id')
    @Roles('expert')
    @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
    async update(@Param('id') id: string, @Body() taskDriverLog: UpdateTaskDriverLogDto){
        return this.taskDriverLogService.update(id, taskDriverLog)
        .then((taskDriverLog: TaskDriverLog) => {
            return this.getITaskDriverLog(taskDriverLog);
        })
        .catch((error: ErrorResult) => {
            return ErrorManager.manageErrorResult(error);
        });
    }

    @Get(':id')
    async getRole(@Param('id') id: string){
        return this.taskDriverLogService.getTaskDriverLog(id)
        .then((taskDriverLog: TaskDriverLog) => {
            return this.getITaskDriverLog(taskDriverLog);
        })
        .catch((error: ErrorResult) => {
            return ErrorManager.manageErrorResult(error);
        });
    }

    @Get()
    @Roles('expert')
    async getTaskDriverLogs(){
        return this.taskDriverLogService.getTaskDriverLogs()
        .then((taskDriverLogs: TaskDriverLog[]) => {
            return taskDriverLogs.map((taskDriverLogs: TaskDriverLog) => {
                return this.getITaskDriverLog(taskDriverLogs);
            });
        })
        .catch((error: ErrorResult) => {
            return ErrorManager.manageErrorResult(error);
        });
    }

    @Delete(':id')
    @Roles('expert')
    async delete(@Param('id') id: string){
        return this.taskDriverLogService.delete(id)
        .then((taskDriverLog: TaskDriverLog) => {
            return this.getITaskDriverLog(taskDriverLog);
        })
        .catch((error: ErrorResult) => {
            return ErrorManager.manageErrorResult(error);
        });
    }

    getITaskDriverLog(taskDriverLog: TaskDriverLog): ITaskDriverLog {
        return {
            id: taskDriverLog.id,
            name: taskDriverLog.name,
            description: taskDriverLog.description,           
            createdAt: taskDriverLog.createdAt,
            updatedAt: taskDriverLog.updatedAt
        };
    }
}
