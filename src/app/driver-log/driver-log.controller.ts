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
import { CreateDriverLogDto } from './dto/create-driver-log.dto';
import { UpdateDriverLogDto } from './dto/update-driver-log.dto';
import { IDriverLog } from './interfaces/driver-log.interface';
import { DriverLog } from './driver-log.entity';
import { DriverLogService } from './driver-log.service';

@Controller('DriverLogs')
//@UseGuards(AuthGuard(), RolesGuard)
export class DriverLogController {

    constructor(private readonly driverLogService: DriverLogService) { }

    @Post()
    //@Roles('expert')
    @UsePipes(new ValidationPipe())
    async create(@Body() driverLog: CreateDriverLogDto) {
        return this.driverLogService.create(driverLog)
            .then((driverLog: DriverLog) => {
                return this.getIDriverLog(driverLog);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Put(':id')
    @Roles('expert')
    @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
    async update(@Param('id') id: string, @Body() user: UpdateDriverLogDto) {
        return this.driverLogService.update(id, user)
            .then((driverLog: DriverLog) => {
                return this.getIDriverLog(driverLog);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Get(':id')
    async getDriverLog(@Param('id') id: string) {
        return this.driverLogService.getDriverLog(id)
            .then((driverLog: DriverLog) => {
                return this.getIDriverLog(driverLog);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Get()
    @Roles('expert')
    async getDriverLogs() {
        return this.driverLogService.getDriverLogs()
        .then((driverLogs: DriverLog[]) => {
            return driverLogs.map((driverLog: DriverLog) => {
                return this.getIDriverLog(driverLog);
            });
        })
        .catch((error: ErrorResult) => {
            return ErrorManager.manageErrorResult(error);
        });
    }

    @Delete(':id')
    @Roles('expert')
    async delete(@Param('id') id: string) {
        return this.driverLogService.delete(id)
            .then((driverLog: DriverLog) => {
                return this.getIDriverLog(driverLog);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    getIDriverLog(DriverLog: DriverLog): IDriverLog {
        return {
            id: DriverLog.id,
            name: DriverLog.name,
            description: DriverLog.description,
            createdAt: DriverLog.createdAt,
        };
    }
}
