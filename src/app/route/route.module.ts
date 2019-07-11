import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { RouteService } from './route.service';
import { RouteController } from './route.controller';
import { Route } from './route.entity';
import { RouteRepository } from './route.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Route, RouteRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  providers: [
    RouteService
  ],
  controllers: [RouteController],
  exports: [
    RouteService
  ]
})
export class RouteModule {}
