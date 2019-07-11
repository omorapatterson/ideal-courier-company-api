import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { PermisionService } from './permision.service';
import { PermisionController } from './permision.controller';
import { Permision } from './permision.entity';
import { PermisionRepository } from './permision.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Permision, PermisionRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  providers: [
    PermisionService
  ],
  controllers: [PermisionController],
  exports: [
    PermisionService
  ]
})
export class PermisionModule {}
