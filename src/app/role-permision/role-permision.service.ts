import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { RolePermision } from './role-permision.entity';
import { RolePermisionRepository } from './role-permision.repository';
import { ErrorResult, InternalServerErrorResult } from '../common/error-manager/errors';
import { ErrorCode } from '../common/error-manager/error-codes';

@Injectable()
export class RolePermisionService {
    constructor(
        @InjectRepository(RolePermision)
        private readonly rolePermisionRepository: RolePermisionRepository,
    ) { }

    create(roleId: string, permisions: string[]): Promise<RolePermision[]> {
        return new Promise((resolve: (result: RolePermision[]) => void, reject: (reason: ErrorResult) => void): void => {
            this.rolePermisionRepository.createRolePermisions(roleId, permisions).then((rolePermisions: RolePermision[]) => {
                resolve(rolePermisions);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    deleteOlds(questionnaireId: string): Promise<RolePermision[]> {
        return new Promise((resolve: (result: RolePermision[]) => void, reject: (reason: ErrorResult) => void): void => {
            this.rolePermisionRepository.deleteOldQuestionnaireSubject(questionnaireId).then((questionnaireSubjects: RolePermision[]) => {
                resolve(questionnaireSubjects);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }
}
