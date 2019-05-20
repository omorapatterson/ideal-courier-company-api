import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ErrorManager } from '../../error-manager/error-manager';
import { ErrorCode } from '../../error-manager/error-codes';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext) {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const hasRole = () =>
            (user.role === 'root' || roles.find(item => item === user.role)) ? true : false;

        if (user && user.role && hasRole()) {
            return true;
        } else {
            ErrorManager.forbidden(ErrorCode.MissingPermission, 'You do not have enough privileges');
        }
    }
}