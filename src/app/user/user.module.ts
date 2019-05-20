import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, UserRepository]),
        PassportModule.register({ defaultStrategy: 'jwt' })
    ],
    providers: [
        UserService,
    ],
    controllers: [UserController],
    exports: [
        UserService,
    ],
})
export class UserModule { }
