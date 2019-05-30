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
import { CreateTaskDriverDto } from './dto/create-task-driver.dto';
import { UpdateTaskDriverDto } from './dto/update-task-driver.dto';
import { ITaskDriver } from './interfaces/task-driver.interface';
import { TaskDriver } from './task-driver.entity';
import { TaskDriverService } from './task-driver.service';

@Controller('task-logs')
//@UseGuards(AuthGuard(), RolesGuard)
export class TaskDriverController {

    constructor(private readonly taskDriverService: TaskDriverService) { }

    @Post()
    //@Roles('expert')
    @UsePipes(new ValidationPipe())
    async create(@Body() taskDriver: CreateTaskDriverDto){
        return this.taskDriverService.create(taskDriver)
        .then((taskDriver: TaskDriver) => {
            return this.getItaskDriver(taskDriver);
        })
        .catch((error: ErrorResult) => {
            return ErrorManager.manageErrorResult(error);
        });
    }

    @Put(':id')
    @Roles('expert')
    @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
    async update(@Param('id') id: string, @Body() taskDrivers: UpdateTaskDriverDto){
        return this.taskDriverService.update(id, taskDrivers)
        .then((taskDriver: TaskDriver) => {
            return this.getItaskDriver(taskDriver);
        })
        .catch((error: ErrorResult) => {
            return ErrorManager.manageErrorResult(error);
        });
    }

    @Get(':id')
    async getRole(@Param('id') id: string){
        return this.taskDriverService.gettaskDriver(id)
        .then((taskDriver: TaskDriver) => {
            return this.getItaskDriver(taskDriver);
        })
        .catch((error: ErrorResult) => {
            return ErrorManager.manageErrorResult(error);
        });
    }

    @Get()
    @Roles('expert')
    async gettaskDrivers(){
        return this.taskDriverService.gettaskDrivers()
        .then((taskDrivers: TaskDriver[]) => {
            return taskDrivers.map((taskDrivers: TaskDriver) => {
                return this.getItaskDriver(taskDrivers);
            });
        })
        .catch((error: ErrorResult) => {
            return ErrorManager.manageErrorResult(error);
        });
    }

    @Delete(':id')
    @Roles('expert')
    async delete(@Param('id') id: string){
        return this.taskDriverService.delete(id)
        .then((taskDriver: TaskDriver) => {
            return this.getItaskDriver(taskDriver);
        })
        .catch((error: ErrorResult) => {
            return ErrorManager.manageErrorResult(error);
        });
    }

    getItaskDriver(taskDriver: TaskDriver): ITaskDriver {
        return {
            id: taskDriver.id,
            comments: taskDriver.comments,
            lat: taskDriver.lat,
            lon: taskDriver.lon,
            pieces: taskDriver.pieces,
            taskDate: taskDriver.taskDate,
            transType: taskDriver.transType,
            description: taskDriver.description,           
            createdAt: taskDriver.createdAt,
            updatedAt: taskDriver.updatedAt
        };
    }
}
