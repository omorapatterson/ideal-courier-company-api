import { Injectable, HttpException, HttpStatus, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { StopRepository } from './stop.repository';
import { Stop } from './stop.entity';
import { CreateStopDto } from './dto/create-stop.dto';
import { ConfigService } from '../common/config/config.service';
import { IStop } from './interfaces/stop.interface';
import { UpdateStopDto } from './dto/update-stop.dto';
import { NotFoundResult, ErrorResult, BadRequestResult, InternalServerErrorResult } from '../common/error-manager/errors';
import { ErrorCode } from '../common/error-manager/error-codes';

@Injectable()
export class StopService {

    constructor(
        @InjectRepository(Stop)
        private readonly stopRepository: StopRepository
    ) { }

    create(stopDto: CreateStopDto): Promise<IStop> {
        return new Promise((resolve: (result: IStop) => void, reject: (reason: ErrorResult) => void): void => {
            this.stopRepository.createStop(stopDto).then((stop: Stop) => {
                resolve(stop);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    update(id: string, stopDto: UpdateStopDto): Promise<IStop> {
        return new Promise((resolve: (result: IStop) => void, reject: (reason: ErrorResult) => void): void => {
            this.stopRepository.getRole(id).then((stop: Stop) => {
                if (!stop) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no stop with the specified ID!'));
                    return;
                }
                this.stopRepository.updateStop(id, stopDto).then((stop: Stop) => {
                    resolve(stop);
                });

            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    getStop(id: string): Promise<IStop> {
        return new Promise((resolve: (result: IStop) => void, reject: (reason: ErrorResult) => void): void => {
            this.stopRepository.getRole(id).then((stop: Stop) => {
                if (!stop) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no stop with the specified ID!'));
                    return;
                }
                resolve(stop);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    getStops(): Promise<IStop[]> {
        return new Promise((resolve: (result: IStop[]) => void, reject: (reason: ErrorResult) => void): void => {
            this.stopRepository.getRoles().then((stops: Stop[]) => {
                resolve(stops);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    delete(id: string): Promise<IStop> {
        return new Promise((resolve: (result: IStop) => void, reject: (reason: ErrorResult) => void): void => {
            this.stopRepository.getRole(id).then((stop: Stop) => {
                if (!stop) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no stop with the specified ID!'));
                    return;
                }
                this.stopRepository.remove(stop).then((stop: Stop) => {
                    if (!stop) {
                        reject(new BadRequestResult(ErrorCode.UnknownError, 'It can not be eliminated!'));
                        return;
                    }
                    resolve(stop);
                });
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }   
}
