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
import { CreateTaskWaypointDto } from './dto/create-task-waypoint.dto';
import { UpdateTaskWaypointDto } from './dto/update-task-waypoint.dto';
import { ITaskWaypoint } from './interfaces/task-waypoint.interface';
import { TaskWaypoint } from './task-waypoint.entity';
import { TaskWaypointService } from './task-waypoint.service';

@Controller('task-logs')
//@UseGuards(AuthGuard(), RolesGuard)
export class TaskWaypointController {

    constructor(private readonly TaskWaypointService: TaskWaypointService) { }

    @Post()
    //@Roles('expert')
    @UsePipes(new ValidationPipe())
    async create(@Body() taskWaypoint: CreateTaskWaypointDto){
        return this.TaskWaypointService.create(taskWaypoint)
        .then((taskWaypoint: TaskWaypoint) => {
            return this.getITaskWaypoint(taskWaypoint);
        })
        .catch((error: ErrorResult) => {
            return ErrorManager.manageErrorResult(error);
        });
    }

    @Put(':id')
    @Roles('expert')
    @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
    async update(@Param('id') id: string, @Body() taskWaypoint: UpdateTaskWaypointDto){
        return this.TaskWaypointService.update(id, taskWaypoint)
        .then((taskWaypoint: TaskWaypoint) => {
            return this.getITaskWaypoint(taskWaypoint);
        })
        .catch((error: ErrorResult) => {
            return ErrorManager.manageErrorResult(error);
        });
    }

    @Get(':id')
    async getTaskWaypoint(@Param('id') id: string){
        return this.TaskWaypointService.getTaskWaypoint(id)
        .then((taskWaypoint: TaskWaypoint) => {
            return this.getITaskWaypoint(taskWaypoint);
        })
        .catch((error: ErrorResult) => {
            return ErrorManager.manageErrorResult(error);
        });
    }

    @Get()
    @Roles('expert')
    async getTaskWaypoints(){
        return this.TaskWaypointService.getTaskWaypoints()
        .then((taskWaypoints: TaskWaypoint[]) => {
            return taskWaypoints.map((taskWaypoint: TaskWaypoint) => {
                return this.getITaskWaypoint(taskWaypoint);
            });
        })
        .catch((error: ErrorResult) => {
            return ErrorManager.manageErrorResult(error);
        });
    }

    @Delete(':id')
    @Roles('expert')
    async delete(@Param('id') id: string){
        return this.TaskWaypointService.delete(id)
        .then((taskWaypoint: TaskWaypoint) => {
            return this.getITaskWaypoint(taskWaypoint);
        })
        .catch((error: ErrorResult) => {
            return ErrorManager.manageErrorResult(error);
        });
    }

    getITaskWaypoint(TaskWaypoint: TaskWaypoint): ITaskWaypoint {
        return {
            id: TaskWaypoint.id,
            name: TaskWaypoint.name,
            description: TaskWaypoint.description,           
            createdAt: TaskWaypoint.createdAt,
            updatedAt: TaskWaypoint.updatedAt
        };
    }
}
