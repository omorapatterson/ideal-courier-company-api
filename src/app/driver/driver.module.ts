import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { Driver } from './driver.entity';
import { DriverRepository } from './driver.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([Driver, DriverRepository]),
        PassportModule.register({ defaultStrategy: 'jwt' })
    ],
    providers: [
        DriverService,
    ],
    controllers: [DriverController],
    exports: [
        DriverService,
    ],
})
export class UserModule { }
