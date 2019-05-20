import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DriverRepository } from './driver.repository';
import { Driver } from './driver.entity';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { NotFoundResult, ErrorResult, BadRequestResult, InternalServerErrorResult } from '../common/error-manager/errors';
import { ErrorCode } from '../common/error-manager/error-codes';

@Injectable()
export class DriverService {

    constructor(
        @InjectRepository(Driver)
        private readonly driverRepository: DriverRepository
    ) { }

    create(driverDto: CreateDriverDto): Promise<Driver> {
        return new Promise((resolve: (result: Driver) => void, reject: (reason: ErrorResult) => void): void => {
            this.driverRepository.getDriverByEmail(driverDto.email).then((driver: Driver) => {
                if (driver) {
                    reject(new BadRequestResult(ErrorCode.UnknownEntity, 'There is a driver with same email!'));
                    return;
                }
                this.driverRepository.createDriver(driverDto).then((driver: Driver) => {
                    resolve(driver);
                });
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    update(id: string, driverDto: UpdateDriverDto): Promise<Driver> {
        return new Promise((resolve: (result: Driver) => void, reject: (reason: ErrorResult) => void): void => {
            this.driverRepository.getDriver(id).then((driver: Driver) => {
                if (!driver) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no driver with the specified ID!'));
                    return;
                }
                this.driverRepository.getDriverByEmail(driverDto.email).then((driver: Driver) => {
                    if (driver && driver.id !== id) {
                        reject(new BadRequestResult(ErrorCode.UnknownEntity, 'There is a driver with same email!'));
                        return;
                    }
                    this.driverRepository.updateDriver(id, driverDto).then((driver: Driver) => {
                        resolve(driver);
                    });
                });
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    getDriver(id: string): Promise<Driver> {
        return new Promise((resolve: (result: Driver) => void, reject: (reason: ErrorResult) => void): void => {
            this.driverRepository.getDriver(id).then((driver: Driver) => {
                if (!driver) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no driver with the specified ID!'));
                    return;
                }
                resolve(driver);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    getDrivers(): Promise<Driver[]> {
        return new Promise((resolve: (result: Driver[]) => void, reject: (reason: ErrorResult) => void): void => {
            this.driverRepository.getDrivers().then((drivers: Driver[]) => {
                resolve(drivers);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    delete(id: string): Promise<Driver> {
        return new Promise((resolve: (result: Driver) => void, reject: (reason: ErrorResult) => void): void => {
            this.driverRepository.getDriver(id).then((driver: Driver) => {
                if (!driver) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no driver with the specified ID!'));
                    return;
                }
                this.driverRepository.deleteDriver(driver).then((driver: Driver) => {
                    if (!driver) {
                        reject(new BadRequestResult(ErrorCode.UnknownError, 'It can not be eliminated!'));
                        return;
                    }
                    resolve(driver);
                });
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    signIn(email: string, password: string): Promise<Driver> {
        return new Promise((resolve: (result: Driver) => void, reject: (reason: ErrorResult) => void): void => {
            this.driverRepository.signIn(email, password).then((driver: Driver) => {
                if (!driver) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'Invalid credentials!'));
                    return;
                }
                resolve(driver);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    getdriverByEmail(email: string): Promise<Driver> {
        return new Promise((resolve: (result: Driver) => void, reject: (reason: ErrorResult) => void): void => {
            this.driverRepository.getDriverByEmail(email).then((driver: Driver) => {
                if (!driver) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no driver with the specified ID!'));
                    return;
                }
                resolve(driver);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }
}
