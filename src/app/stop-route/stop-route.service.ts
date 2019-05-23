import { Injectable, HttpException, HttpStatus, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { StopRouteRepository } from './stop-route.repository';
import { StopRoute } from './stop-route.entity';
import { CreateStopRouteDto } from './dto/create-stop-route.dto';
import { ConfigService } from '../common/config/config.service';
import { IStopRoute } from './interfaces/stop-route.interface';
import { UpdateStopRouteDto } from './dto/update-stop-route.dto';
import { NotFoundResult, ErrorResult, BadRequestResult, InternalServerErrorResult } from '../common/error-manager/errors';
import { ErrorCode } from '../common/error-manager/error-codes';

@Injectable()
export class StopRouteService {

    constructor(
        @InjectRepository(StopRoute)
        private readonly stopRouteRepository: StopRouteRepository
    ) { }

    create(stopRouteDto: CreateStopRouteDto): Promise<IStopRoute> {
        return new Promise((resolve: (result: IStopRoute) => void, reject: (reason: ErrorResult) => void): void => {
            this.stopRouteRepository.createStopRoute(stopRouteDto).then((stopRoute: StopRoute) => {
                resolve(stopRoute);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    update(id: string, stopRouteDto: UpdateStopRouteDto): Promise<IStopRoute> {
        return new Promise((resolve: (result: IStopRoute) => void, reject: (reason: ErrorResult) => void): void => {
            this.stopRouteRepository.getRole(id).then((stopRoute: StopRoute) => {
                if (!stopRoute) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no stopRoute with the specified ID!'));
                    return;
                }
                this.stopRouteRepository.updateStopRoute(id, stopRouteDto).then((stopRoute: StopRoute) => {
                    resolve(stopRoute);
                });

            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    getStopRoute(id: string): Promise<IStopRoute> {
        return new Promise((resolve: (result: IStopRoute) => void, reject: (reason: ErrorResult) => void): void => {
            this.stopRouteRepository.getRole(id).then((stopRoute: StopRoute) => {
                if (!stopRoute) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no stopRoute with the specified ID!'));
                    return;
                }
                resolve(stopRoute);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    getStopRoutes(): Promise<IStopRoute[]> {
        return new Promise((resolve: (result: IStopRoute[]) => void, reject: (reason: ErrorResult) => void): void => {
            this.stopRouteRepository.getRoles().then((stopRoutes: StopRoute[]) => {
                resolve(stopRoutes);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    delete(id: string): Promise<IStopRoute> {
        return new Promise((resolve: (result: IStopRoute) => void, reject: (reason: ErrorResult) => void): void => {
            this.stopRouteRepository.getRole(id).then((stopRoute: StopRoute) => {
                if (!stopRoute) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no stopRoute with the specified ID!'));
                    return;
                }
                this.stopRouteRepository.remove(stopRoute).then((stopRoute: StopRoute) => {
                    if (!stopRoute) {
                        reject(new BadRequestResult(ErrorCode.UnknownError, 'It can not be eliminated!'));
                        return;
                    }
                    resolve(stopRoute);
                });
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }   
}
