import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolePermision } from './role-permision.entity';
import { RolePermisionRepository } from './role-permision.repository';
import { RolePermisionService } from './role-permision.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([RolePermision, RolePermisionRepository]),
    ],
    providers: [
        RolePermisionService,
    ],
    exports: [
        RolePermisionService,
    ],
})
export class RolePermisionModule { }
