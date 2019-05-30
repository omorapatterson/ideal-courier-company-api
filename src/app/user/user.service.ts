import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundResult, ErrorResult, BadRequestResult, InternalServerErrorResult } from '../common/error-manager/errors';
import { ErrorCode } from '../common/error-manager/error-codes';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: UserRepository
    ) { }

    create(userDto: CreateUserDto, companyId: string ): Promise<User> {
        return new Promise((resolve: (result: User) => void, reject: (reason: ErrorResult) => void): void => {
            this.userRepository.getUserByEmail(userDto.email).then((user: User) => {
                if (user) {
                    reject(new BadRequestResult(ErrorCode.UnknownEntity, 'There is a user with same email!'));
                    return;
                }
                this.userRepository.createUser(userDto, companyId).then((user: User) => {
                    resolve(user);
                });
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    update(id: string, userDto: UpdateUserDto): Promise<User> {
        return new Promise((resolve: (result: User) => void, reject: (reason: ErrorResult) => void): void => {
            this.userRepository.getUser(id).then((user: User) => {
                if (!user) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no user with the specified ID!'));
                    return;
                }
                this.userRepository.getUserByEmail(userDto.email).then((user: User) => {
                    if (user && user.id !== id) {
                        reject(new BadRequestResult(ErrorCode.UnknownEntity, 'There is a user with same email!'));
                        return;
                    }
                    this.userRepository.updateUser(id, userDto).then((user: User) => {
                        resolve(user);
                    });
                });
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    getUser(id: string): Promise<User> {
        return new Promise((resolve: (result: User) => void, reject: (reason: ErrorResult) => void): void => {
            this.userRepository.getUser(id).then((user: User) => {
                if (!user) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no user with the specified ID!'));
                    return;
                }
                resolve(user);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    getUsers(): Promise<User[]> {
        return new Promise((resolve: (result: User[]) => void, reject: (reason: ErrorResult) => void): void => {
            this.userRepository.getUsers().then((users: User[]) => {
                resolve(users);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    delete(id: string): Promise<User> {
        return new Promise((resolve: (result: User) => void, reject: (reason: ErrorResult) => void): void => {
            this.userRepository.getUser(id).then((user: User) => {
                if (!user) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no user with the specified ID!'));
                    return;
                }
                this.userRepository.deleteUser(user).then((user: User) => {
                    if (!user) {
                        reject(new BadRequestResult(ErrorCode.UnknownError, 'It can not be eliminated!'));
                        return;
                    }
                    resolve(user);
                });
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    signIn(email: string, password: string): Promise<User> {
        return new Promise((resolve: (result: User) => void, reject: (reason: ErrorResult) => void): void => {
            this.userRepository.signIn(email, password).then((user: User) => {
                if (!user) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'Invalid credentials!'));
                    return;
                }
                resolve(user);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    getUserByEmail(email: string): Promise<User> {
        return new Promise((resolve: (result: User) => void, reject: (reason: ErrorResult) => void): void => {
            this.userRepository.getUserByEmail(email).then((user: User) => {
                if (!user) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no user with the specified ID!'));
                    return;
                }
                resolve(user);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }
}
