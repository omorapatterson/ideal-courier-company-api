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
import { CreateTaskDriverWaypointDto } from './dto/create-task-driver-waypoint.dto';
import { UpdateTaskDriverWaypointDto } from './dto/update-task-driver-waypoint.dto';
import { ITaskDriverWaypoint } from './interfaces/task-driver-waypoint.interface';
import { TaskDriverWaypoint } from './task-driver-waypoint.entity';
import { TaskDriverWaypointService } from './task-driver-waypoint.service';

@Controller('task-logs')
//@UseGuards(AuthGuard(), RolesGuard)
export class TaskDriverWaypointController {

    constructor(private readonly taskDriverWaypointService: TaskDriverWaypointService) { }

    @Post()
    //@Roles('expert')
    @UsePipes(new ValidationPipe())
    async create(@Body() taskDriverWaypoint: CreateTaskDriverWaypointDto){
        return this.taskDriverWaypointService.create(taskDriverWaypoint)
        .then((taskDriverWaypoint: TaskDriverWaypoint) => {
            return this.getItaskDriverWaypoint(taskDriverWaypoint);
        })
        .catch((error: ErrorResult) => {
            return ErrorManager.manageErrorResult(error);
        });
    }

    @Put(':id')
    @Roles('expert')
    @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
    async update(@Param('id') id: string, @Body() taskDriverWaypoints: UpdateTaskDriverWaypointDto){
        return this.taskDriverWaypointService.update(id, taskDriverWaypoints)
        .then((taskDriverWaypoint: TaskDriverWaypoint) => {
            return this.getItaskDriverWaypoint(taskDriverWaypoint);
        })
        .catch((error: ErrorResult) => {
            return ErrorManager.manageErrorResult(error);
        });
    }

    @Get(':id')
    async getRole(@Param('id') id: string){
        return this.taskDriverWaypointService.gettaskDriverWaypoint(id)
        .then((taskDriverWaypoint: TaskDriverWaypoint) => {
            return this.getItaskDriverWaypoint(taskDriverWaypoint);
        })
        .catch((error: ErrorResult) => {
            return ErrorManager.manageErrorResult(error);
        });
    }

    @Get()
    @Roles('expert')
    async gettaskDriverWaypoints(){
        return this.taskDriverWaypointService.gettaskDriverWaypoints()
        .then((taskDriverWaypoints: TaskDriverWaypoint[]) => {
            return taskDriverWaypoints.map((taskDriverWaypoints: TaskDriverWaypoint) => {
                return this.getItaskDriverWaypoint(taskDriverWaypoints);
            });
        })
        .catch((error: ErrorResult) => {
            return ErrorManager.manageErrorResult(error);
        });
    }

    @Delete(':id')
    @Roles('expert')
    async delete(@Param('id') id: string){
        return this.taskDriverWaypointService.delete(id)
        .then((taskDriverWaypoint: TaskDriverWaypoint) => {
            return this.getItaskDriverWaypoint(taskDriverWaypoint);
        })
        .catch((error: ErrorResult) => {
            return ErrorManager.manageErrorResult(error);
        });
    }

    getItaskDriverWaypoint(taskDriverWaypoint: TaskDriverWaypoint): ITaskDriverWaypoint {
        return {
            id: taskDriverWaypoint.id,
            name: taskDriverWaypoint.name,
            description: taskDriverWaypoint.description,           
            createdAt: taskDriverWaypoint.createdAt,
            updatedAt: taskDriverWaypoint.updatedAt
        };
    }
}
