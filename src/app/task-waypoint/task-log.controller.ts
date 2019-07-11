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
//
import { CreateTaskWaypointDto } from './dto/create-task-log.dto';
import { UpdateTaskWaypointDto } from './dto/update-task-waypoint.dto';
import { ITaskWaypoint } from './interfaces/task-waypoint.interface';
import { TaskWaypoint } from './task-log.entity';
import { TaskWaypointService } from './task-waypoint.service';

@Controller('task-logs')
//@UseGuards(AuthGuard(), RolesGuard)
export class TaskWaypointController {

    constructor(private readonly TaskWaypointService: TaskWaypointService) { }

    @Post()
    //@Roles('expert')
    @UsePipes(new ValidationPipe())
    async create(@Body() TaskWaypoint: CreateTaskWaypointDto): Promise<ITaskWaypoint> {
        return this.TaskWaypointService.create(TaskWaypoint);
    }

    @Put(':id')
    @Roles('expert')
    @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
    async update(@Param('id') id: string, @Body() user: UpdateTaskWaypointDto): Promise<ITaskWaypoint> {
        return this.TaskWaypointService.update(id, user);
    }

    @Get(':id')
    async getRole(@Param('id') id: string): Promise<ITaskWaypoint> {
        return this.TaskWaypointService.getTaskWaypoint(id);
    }

    @Get()
    @Roles('expert')
    async getRoles(): Promise<ITaskWaypoint[]> {
        return this.TaskWaypointService.getTaskWaypoints();
    }

    @Delete(':id')
    @Roles('expert')
    async delete(@Param('id') id: string): Promise<ITaskWaypoint> {
        return this.TaskWaypointService.delete(id);
    }

    getIRole(TaskWaypoint: TaskWaypoint): ITaskWaypoint {
        return {
            id: TaskWaypoint.id,
            name: TaskWaypoint.name,
            description: TaskWaypoint.description,           
            createdAt: TaskWaypoint.createdAt,
            updatedAt: TaskWaypoint.updatedAt
        };
    }
}
