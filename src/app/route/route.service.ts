import { Injectable, HttpException, HttpStatus, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { RouteRepository } from './route.repository';
import { Route } from './route.entity';
import { CreateRouteDto } from './dto/create-route.dto';
import { ConfigService } from '../common/config/config.service';
import { IRoute } from './interfaces/route.interface';
import { UpdateRouteDto } from './dto/update-route.dto';
import { NotFoundResult, ErrorResult, BadRequestResult, InternalServerErrorResult } from '../common/error-manager/errors';
import { ErrorCode } from '../common/error-manager/error-codes';

@Injectable()
export class RouteService {

    constructor(
        @InjectRepository(Route)
        private readonly routeRepository: RouteRepository
    ) { }

    create(routeDto: CreateRouteDto): Promise<IRoute> {
        return new Promise((resolve: (result: IRoute) => void, reject: (reason: ErrorResult) => void): void => {
            this.routeRepository.createRoute(routeDto).then((route: Route) => {
                resolve(route);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    update(id: string, routeDto: UpdateRouteDto): Promise<IRoute> {
        return new Promise((resolve: (result: IRoute) => void, reject: (reason: ErrorResult) => void): void => {
            this.routeRepository.getRole(id).then((route: Route) => {
                if (!route) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no route with the specified ID!'));
                    return;
                }
                this.routeRepository.updateRoute(id, routeDto).then((route: Route) => {
                    resolve(route);
                });

            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    getRoute(id: string): Promise<IRoute> {
        return new Promise((resolve: (result: IRoute) => void, reject: (reason: ErrorResult) => void): void => {
            this.routeRepository.getRole(id).then((route: Route) => {
                if (!route) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no route with the specified ID!'));
                    return;
                }
                resolve(route);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    getRoutes(): Promise<IRoute[]> {
        return new Promise((resolve: (result: IRoute[]) => void, reject: (reason: ErrorResult) => void): void => {
            this.routeRepository.getRoles().then((routes: Route[]) => {
                resolve(routes);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    delete(id: string): Promise<IRoute> {
        return new Promise((resolve: (result: IRoute) => void, reject: (reason: ErrorResult) => void): void => {
            this.routeRepository.getRole(id).then((route: Route) => {
                if (!route) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no route with the specified ID!'));
                    return;
                }
                this.routeRepository.remove(route).then((route: Route) => {
                    if (!route) {
                        reject(new BadRequestResult(ErrorCode.UnknownError, 'It can not be eliminated!'));
                        return;
                    }
                    resolve(route);
                });
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }   
}
