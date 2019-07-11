import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload } from './interfaces/jwt-payload.interface';
import { ILogin } from './interfaces/login.interface';
import { ConfigService } from '../config/config.service';
import { NotFoundResult, ErrorResult, InternalServerErrorResult } from '../error-manager/errors';
import { ErrorCode } from '../error-manager/error-codes';
import { User } from '../../user/user.entity';
import { IUser } from '../../user/interfaces/user.interface';
import { UserService } from '../../user/user.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ) { }

    signIn(email: string, password: string) {
        return new Promise((resolve: (result: ILogin) => void, reject: (reason: ErrorResult) => void): void => {
            this.userService.signIn(email, password).then((user: User) => {
                const response: ILogin = {
                    user: this.getIUser(user),
                    token: this.createToken(user),
                    expiresIn: +this.configService.get('JWT_EXPIRES_IN')
                };
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    createToken(user: User) {
        const token: JwtPayload = {
            userId: user.id,
            email: user.email,
            role: user.role,
        };
        return this.jwtService.sign(token);
    }

    validate(payload: JwtPayload): Promise<User> {
        return new Promise((resolve: (result: any) => void, reject: (reason: ErrorResult) => void): void => {
            this.userService.getUserByEmail(payload.email).then((user: User) => {
                resolve(user);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    getIUser(user: User): IUser {
        return {
            id: user.id,
            companyId: user.company.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            //lastLogin: user.lastLogin,
            phone: user.phone,
            language: user.language,            
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
    }
}
