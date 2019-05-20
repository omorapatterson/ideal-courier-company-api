import { Injectable, HttpException, HttpStatus, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { RoleRepository } from './role.repository';
import { Role } from './role.entity';
import { CreateRoleDto } from './dto/role.dto';
import { ConfigService } from '../common/config/config.service';
import { IRole } from './interfaces/role.interface';
import { UpdateRoleDto } from './dto/update-role.dto';
import { NotFoundResult, ErrorResult, BadRequestResult, InternalServerErrorResult } from '../common/error-manager/errors';
import { ErrorCode } from '../common/error-manager/error-codes';

@Injectable()
export class RoleService {

    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: RoleRepository
    ) { }

    create(roleDto: CreateRoleDto): Promise<IRole> {
        return new Promise((resolve: (result: IRole) => void, reject: (reason: ErrorResult) => void): void => {
            this.roleRepository.createRole(roleDto).then((role: Role) => {
                resolve(role);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    update(id: string, roleDto: UpdateRoleDto): Promise<IRole> {
        return new Promise((resolve: (result: IRole) => void, reject: (reason: ErrorResult) => void): void => {
            this.roleRepository.getRole(id).then((role: Role) => {
                if (!role) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no user with the specified ID!'));
                    return;
                }

                this.roleRepository.updateRole(id, roleDto).then((role: Role) => {
                    resolve(role);
                });

            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    getRole(id: string): Promise<IRole> {
        return new Promise((resolve: (result: IRole) => void, reject: (reason: ErrorResult) => void): void => {
            this.roleRepository.getRole(id).then((role: Role) => {
                if (!role) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no role with the specified ID!'));
                    return;
                }
                resolve(role);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    getRoles(): Promise<IRole[]> {
        return new Promise((resolve: (result: IRole[]) => void, reject: (reason: ErrorResult) => void): void => {
            this.roleRepository.getRoles().then((roles: Role[]) => {
                resolve(roles);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    delete(id: string): Promise<IRole> {
        return new Promise((resolve: (result: IRole) => void, reject: (reason: ErrorResult) => void): void => {
            this.roleRepository.getRole(id).then((role: Role) => {
                if (!role) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no role with the specified ID!'));
                    return;
                }
                this.roleRepository.remove(role).then((role: Role) => {
                    if (!role) {
                        reject(new BadRequestResult(ErrorCode.UnknownError, 'It can not be eliminated!'));
                        return;
                    }
                    resolve(role);
                });
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }   
}
