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
import { RolesGuard } from '../common/auth/guards/roles.guard';
import { Roles } from '../common/decorator/roles.decorator';
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { ErrorResult } from '../common/error-manager/errors';
import { ErrorManager } from '../common/error-manager/error-manager';
//
import { CreatePermisionDto } from './dto/permision.dto';
import { UpdatePermisionDto } from './dto/update-permision.dto';
import { IPermision } from './interfaces/permision.interface';
import { Permision } from './permision.entity';
import { PermisionService } from './permision.service';

@Controller('permision')
//@UseGuards(AuthGuard(), RolesGuard)
export class PermisionController {

    constructor(private readonly permisionService: PermisionService) { }

    @Post()
    //@Roles('expert')
    @UsePipes(new ValidationPipe())
    async create(@Body() permision: CreatePermisionDto) {
        return this.permisionService.create(permision)
            .then((permision: Permision) => {
                return this.getIPermision(permision);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Put(':id')
    @Roles('expert')
    @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
    async update(@Param('id') id: string, @Body() permision: UpdatePermisionDto) {
        return this.permisionService.update(id, permision)
            .then((permision: Permision) => {
                return this.getIPermision(permision);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Get(':id')
    async getRole(@Param('id') id: string) {
        return this.permisionService.getPermision(id)
            .then((permision: Permision) => {
                return this.getIPermision(permision);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Get()
    @Roles('expert')
    async getRoles() {
        return this.permisionService.getPermisions()
            .then((permisions: Permision[]) => {
                return permisions.map((permision: Permision) => {
                    return this.getIPermision(permision);
                });
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Delete(':id')
    @Roles('expert')
    async delete(@Param('id') id: string) {
        return this.permisionService.delete(id)
            .then((permision: Permision) => {
                return this.getIPermision(permision);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    getIPermision(permision: Permision): IPermision {
        return {
            id: permision.id,
            name: permision.name,
            description: permision.description,
            createdAt: permision.createdAt,
            updatedAt: permision.updatedAt
        };
    }
}
