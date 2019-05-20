import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../../user/user.module';
import { ConfigService } from '../config/config.service';

const configService = new ConfigService();

@Module({
    imports: [
        DatabaseModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secretOrPrivateKey: configService.get('JWT_SECRET_KEY'),
            signOptions: {
                expiresIn: configService.get('JWT_EXPIRES_IN'),
            },
        }),
        UserModule,
    ],
    providers: [
        AuthService,
        ConfigService,
        JwtStrategy,
    ],
    controllers: [AuthController],
    exports: [
        AuthService,
        DatabaseModule,
    ],
})
export class AuthModule { }
