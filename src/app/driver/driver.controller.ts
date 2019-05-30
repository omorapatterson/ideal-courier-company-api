import {
    Controller,
    Get,
    Post,
    Body,
    UseGuards,
    Put,
    Param,
    Delete,
    UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { IDriver } from './interfaces/driver.interface';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { RolesGuard } from '../common/auth/guards/roles.guard';
import { Roles } from '../common/decorator/roles.decorator';
import { ErrorResult } from '../common/error-manager/errors';
import { ErrorManager } from '../common/error-manager/error-manager';
import { Driver } from './driver.entity';

@Controller('drivers')
//@UseGuards(AuthGuard(), RolesGuard)
export class DriverController {

    constructor(private readonly driverService: DriverService) { }

    @Post()
    //@Roles('expert')
    @UsePipes(new ValidationPipe())
    async create(@Body() driver: CreateDriverDto) {
        return this.driverService.create(driver)
            .then((driver: Driver) => {
                return this.getIDriver(driver);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Put(':id')
    @Roles('expert')
    @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
    async update(@Param('id') id: string, @Body() driver: UpdateDriverDto) {
        return this.driverService.update(id, driver)
            .then((driver: Driver) => {
                return this.getIDriver(driver);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Get(':id')
    async getDriver(@Param('id') id: string) {
        return this.driverService.getDriver(id)
            .then((driver: Driver) => {
                return this.getIDriver(driver);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Get()
    @Roles('expert')
    async getDrivers() {
        return this.driverService.getDrivers()
            .then((drivers: Driver[]) => {
                return drivers.map((driver: Driver) => {
                    return this.getIDriver(driver);
                });
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Delete(':id')
    @Roles('expert')
    async delete(@Param('id') id: string) {
        return this.driverService.delete(id)
            .then((driver: Driver) => {
                return this.getIDriver(driver);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    getIDriver(driver: Driver): IDriver {
        return {
            id: driver.id,
            firstName: driver.firstName,
            lastName: driver.lastName,
            email: driver.email,
            createdAt: driver.createdAt,
            updatedAt: driver.updatedAt,
        };
    }
}
