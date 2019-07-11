import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { StopService } from './stop.service';
import { StopController } from './stop.controller';
import { Stop } from './stop.entity';
import { StopRepository } from './stop.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Stop, StopRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  providers: [
    StopService
  ],
  controllers: [StopController],
  exports: [
    StopService
  ]
})
export class StopModule {}
