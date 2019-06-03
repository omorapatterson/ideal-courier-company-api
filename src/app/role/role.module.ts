import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
//
import { RolePermisionModule } from '../role-permision/role-permision.module';
//
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Role } from './role.entity';
import { RoleRepository } from './role.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, RoleRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    RolePermisionModule
  ],
  providers: [
    RoleService
  ],
  controllers: [RoleController],
  exports: [
    RoleService
  ]
})
export class RoleModule {}
