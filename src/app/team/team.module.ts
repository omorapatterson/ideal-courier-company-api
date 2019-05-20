import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { Team } from './team.entity';
import { TeamRepository } from './team.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Team, TeamRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  providers: [
    TeamService
  ],
  controllers: [TeamController],
  exports: [
    TeamService
  ]
})
export class RoleModule {}
