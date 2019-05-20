import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Role } from './role.entity';
import { RoleRepository } from './role.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role, RoleRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' })
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
