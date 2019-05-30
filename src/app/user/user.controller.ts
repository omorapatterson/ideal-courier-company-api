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

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './interfaces/user.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { RolesGuard } from '../common/auth/guards/roles.guard';
import { Roles } from '../common/decorator/roles.decorator';
import { ErrorResult } from '../common/error-manager/errors';
import { ErrorManager } from '../common/error-manager/error-manager';
import { User } from './user.entity';

@Controller('users')
//@UseGuards(AuthGuard(), RolesGuard)
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post()
    //@Roles('expert')
    //@UsePipes(new ValidationPipe())
    async create(@Body() user: CreateUserDto, @Body() companyId: string) {
        return this.userService.create(user, companyId)
            .then((user: User) => {
                return this.getIUser(user);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Put(':id')
    @Roles('expert')
    @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
    async update(@Param('id') id: string, @Body() user: UpdateUserDto) {
        return this.userService.update(id, user)
            .then((user: User) => {
                return this.getIUser(user);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Get(':id')
    async getUser(@Param('id') id: string) {
        return this.userService.getUser(id)
            .then((user: User) => {
                return this.getIUser(user);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Get()
    @Roles('expert')
    async getUsers() {
        return this.userService.getUsers()
            .then((users: User[]) => {
                return users.map((user: User) => {
                    return this.getIUser(user);
                });
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Delete(':id')
    @Roles('expert')
    async delete(@Param('id') id: string) {
        return this.userService.delete(id)
            .then((user: User) => {
                return this.getIUser(user);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    getIUser(user: User): IUser {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            language: user.language,
            phone: user.phone,
            //lastLogin: user.lastLogin,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
}
