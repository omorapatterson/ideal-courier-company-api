import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { StopRouteService } from './stop-route.service';
import { StopRouteController } from './stop-route.controller';
import { StopRoute } from './stop-route.entity';
import { StopRouteRepository } from './stop-route.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([StopRoute, StopRouteRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  providers: [
    StopRouteService
  ],
  controllers: [StopRouteController],
  exports: [
    StopRouteService
  ]
})
export class StopRouteModule {}
