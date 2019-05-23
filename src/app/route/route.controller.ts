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
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { IRoute } from './interfaces/route.interface';
import { Route } from './route.entity';
import { RouteService } from './route.service';

@Controller('roles')
//@UseGuards(AuthGuard(), RolesGuard)
export class RouteController {

    constructor(private readonly routeService: RouteService) { }

    @Post()
    //@Roles('expert')
    @UsePipes(new ValidationPipe())
    async create(@Body() role: CreateRouteDto) {
        return this.routeService.create(role)
            .then((route: Route) => {
                return this.getIRoute(route);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Put(':id')
    @Roles('expert')
    @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
    async update(@Param('id') id: string, @Body() route: UpdateRouteDto) {
        return this.routeService.update(id, route)
            .then((route: Route) => {
                return this.getIRoute(route);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Get(':id')
    async getRole(@Param('id') id: string) {
        return this.routeService.getRoute(id)
            .then((route: Route) => {
                return this.getIRoute(route);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Get()
    @Roles('expert')
    async getRoles() {
        return this.routeService.getRoutes()
        .then((routes: Route[]) => {
            return routes.map((route: Route) => {
                return this.getIRoute(route);
            });
        })
        .catch((error: ErrorResult) => {
            return ErrorManager.manageErrorResult(error);
        });
    }

    @Delete(':id')
    @Roles('expert')
    async delete(@Param('id') id: string) {
        return this.routeService.delete(id)
            .then((route: Route) => {
                return this.getIRoute(route);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    getIRoute(route: Route): IRoute {
        return {
            id: route.id,
            name: route.name,
            description: route.description,
            createdAt: route.createdAt,
            updatedAt: route.updatedAt
        };
    }
}
