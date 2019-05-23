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
import { CreateStopDto } from './dto/create-stop.dto';
import { UpdateStopDto } from './dto/update-stop.dto';
import { IStop } from './interfaces/stop.interface';
import { Stop } from './stop.entity';
import { StopService } from './stop.service';

@Controller('roles')
//@UseGuards(AuthGuard(), RolesGuard)
export class StopController {

    constructor(private readonly stopService: StopService) { }

    @Post()
    //@Roles('expert')
    @UsePipes(new ValidationPipe())
    async create(@Body() role: CreateStopDto) {
        return this.stopService.create(role)
            .then((stop: Stop) => {
                return this.getIStop(stop);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Put(':id')
    @Roles('expert')
    @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
    async update(@Param('id') id: string, @Body() stop: UpdateStopDto) {
        return this.stopService.update(id, stop)
            .then((stop: Stop) => {
                return this.getIStop(stop);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Get(':id')
    async getRole(@Param('id') id: string) {
        return this.stopService.getStop(id)
            .then((stop: Stop) => {
                return this.getIStop(stop);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Get()
    @Roles('expert')
    async getRoles() {
        return this.stopService.getStops()
        .then((stops: Stop[]) => {
            return stops.map((stop: Stop) => {
                return this.getIStop(stop);
            });
        })
        .catch((error: ErrorResult) => {
            return ErrorManager.manageErrorResult(error);
        });
    }

    @Delete(':id')
    @Roles('expert')
    async delete(@Param('id') id: string) {
        return this.stopService.delete(id)
            .then((stop: Stop) => {
                return this.getIStop(stop);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    getIStop(stop: Stop): IStop {
        return {
            id: stop.id,
            description: stop.description,
            createdAt: stop.createdAt,
            updatedAt: stop.updatedAt
        };
    }
}
