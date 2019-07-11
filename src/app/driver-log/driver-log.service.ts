import { Injectable, HttpException, HttpStatus, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { DriverLogRepository } from './driver-log.repository';
import { DriverLog } from './driver-log.entity';
import { CreateDriverLogDto } from './dto/create-driver-log.dto';
import { ConfigService } from '../common/config/config.service';
import { IDriverLog } from './interfaces/driver-log.interface';
import { UpdateDriverLogDto } from './dto/update-driver-log.dto';
import { NotFoundResult, ErrorResult, BadRequestResult, InternalServerErrorResult } from '../common/error-manager/errors';
import { ErrorCode } from '../common/error-manager/error-codes';

@Injectable()
export class DriverLogService {

    constructor(
        @InjectRepository(DriverLog)
        private readonly driverLogRepository: DriverLogRepository
    ) { }

    create(DriverLogDto: CreateDriverLogDto): Promise<IDriverLog> {
        return new Promise((resolve: (result: IDriverLog) => void, reject: (reason: ErrorResult) => void): void => {
            this.driverLogRepository.createDriverLog(DriverLogDto).then((driverLog: DriverLog) => {
                resolve(driverLog);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    update(id: string, DriverLogDto: UpdateDriverLogDto): Promise<IDriverLog> {
        return new Promise((resolve: (result: IDriverLog) => void, reject: (reason: ErrorResult) => void): void => {
            this.driverLogRepository.getDriverLog(id).then((driverLog: DriverLog) => {
                if (!driverLog) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no DriverLog with the specified ID!'));
                    return;
                }

                this.driverLogRepository.updateDriverLog(id, driverLog).then((DriverLog: DriverLog) => {
                    resolve(driverLog);
                });

            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    getDriverLog(id: string): Promise<IDriverLog> {
        return new Promise((resolve: (result: IDriverLog) => void, reject: (reason: ErrorResult) => void): void => {
            this.driverLogRepository.getDriverLog(id).then((DriverLog: IDriverLog) => {
                if (!DriverLog) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no DriverLog with the specified ID!'));
                    return;
                }
                resolve(DriverLog);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    getDriverLogs(): Promise<IDriverLog[]> {
        return new Promise((resolve: (result: IDriverLog[]) => void, reject: (reason: ErrorResult) => void): void => {
            this.driverLogRepository.getDriverLogs().then((DriverLog: DriverLog[]) => {
                resolve(DriverLog);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    delete(id: string): Promise<IDriverLog> {
        return new Promise((resolve: (result: IDriverLog) => void, reject: (reason: ErrorResult) => void): void => {
            this.driverLogRepository.getDriverLog(id).then((driverLog: DriverLog) => {
                if (!DriverLog) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no DriverLog with the specified ID!'));
                    return;
                }
                this.driverLogRepository.remove(driverLog).then((driverLog: DriverLog) => {
                    if (!DriverLog) {
                        reject(new BadRequestResult(ErrorCode.UnknownError, 'It can not be eliminated!'));
                        return;
                    }
                    resolve(driverLog);
                });
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }   
}
