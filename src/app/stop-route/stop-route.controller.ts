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
import { CreateStopRouteDto } from './dto/create-stop-route.dto';
import { UpdateStopRouteDto } from './dto/update-stop-route.dto';
import { IStopRoute } from './interfaces/stop-route.interface';
import { StopRoute } from './stop-route.entity';
import { StopRouteService } from './stop-route.service';

@Controller('roles')
//@UseGuards(AuthGuard(), RolesGuard)
export class StopRouteController {

    constructor(private readonly stopRouteService: StopRouteService) { }

    @Post()
    //@Roles('expert')
    @UsePipes(new ValidationPipe())
    async create(@Body() role: CreateStopRouteDto) {
        return this.stopRouteService.create(role)
            .then((stopRoute: StopRoute) => {
                return this.getIStopRoute(stopRoute);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Put(':id')
    @Roles('expert')
    @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
    async update(@Param('id') id: string, @Body() stopRoute: UpdateStopRouteDto) {
        return this.stopRouteService.update(id, stopRoute)
            .then((stopRoute: StopRoute) => {
                return this.getIStopRoute(stopRoute);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Get(':id')
    async getRole(@Param('id') id: string) {
        return this.stopRouteService.getStopRoute(id)
            .then((stopRoute: StopRoute) => {
                return this.getIStopRoute(stopRoute);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Get()
    @Roles('expert')
    async getRoles() {
        return this.stopRouteService.getStopRoutes()
        .then((stopRoutes: StopRoute[]) => {
            return stopRoutes.map((stopRoute: StopRoute) => {
                return this.getIStopRoute(stopRoute);
            });
        })
        .catch((error: ErrorResult) => {
            return ErrorManager.manageErrorResult(error);
        });
    }

    @Delete(':id')
    @Roles('expert')
    async delete(@Param('id') id: string) {
        return this.stopRouteService.delete(id)
            .then((stopRoute: StopRoute) => {
                return this.getIStopRoute(stopRoute);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    getIStopRoute(stopRoute: StopRoute): IStopRoute {
        return {
            id: stopRoute.id,
            description: stopRoute.description,
            sequence: stopRoute.sequence,
            createdAt: stopRoute.createdAt,
            updatedAt: stopRoute.updatedAt
        };
    }
}
