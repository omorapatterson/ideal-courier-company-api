import { Injectable, HttpException, HttpStatus, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { TeamRepository } from './team.repository';
import { Team } from './team.entity';
import { CreateTeamDto } from './dto/team.dto';
import { ConfigService } from '../common/config/config.service';
import { ITeam } from './interfaces/team.interface';
import { UpdateTeamDto } from './dto/update-team.dto';
import { NotFoundResult, ErrorResult, BadRequestResult, InternalServerErrorResult } from '../common/error-manager/errors';
import { ErrorCode } from '../common/error-manager/error-codes';

@Injectable()
export class TeamService {

    constructor(
        @InjectRepository(Team)
        private readonly teamRepository: TeamRepository
    ) { }

    create(teamDto: CreateTeamDto): Promise<ITeam> {
        return new Promise((resolve: (result: ITeam) => void, reject: (reason: ErrorResult) => void): void => {
            this.teamRepository.createTeam(teamDto).then((team: Team) => {
                resolve(team);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    update(id: string, teamDto: UpdateTeamDto): Promise<ITeam> {
        return new Promise((resolve: (result: ITeam) => void, reject: (reason: ErrorResult) => void): void => {
            this.teamRepository.getTeam(id).then((team: Team) => {
                if (!team) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no team with the specified ID!'));
                    return;
                }

                this.teamRepository.updateTeam(id, teamDto).then((role: Team) => {
                    resolve(team);
                });

            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    getTeam(id: string): Promise<ITeam> {
        return new Promise((resolve: (result: ITeam) => void, reject: (reason: ErrorResult) => void): void => {
            this.teamRepository.getTeam(id).then((team: ITeam) => {
                if (!team) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no team with the specified ID!'));
                    return;
                }
                resolve(team);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    getTeams(): Promise<ITeam[]> {
        return new Promise((resolve: (result: ITeam[]) => void, reject: (reason: ErrorResult) => void): void => {
            this.teamRepository.getTeams().then((roles: Team[]) => {
                resolve(roles);
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }

    delete(id: string): Promise<ITeam> {
        return new Promise((resolve: (result: ITeam) => void, reject: (reason: ErrorResult) => void): void => {
            this.teamRepository.getTeam(id).then((team: Team) => {
                if (!team) {
                    reject(new NotFoundResult(ErrorCode.UnknownEntity, 'There is no team with the specified ID!'));
                    return;
                }
                this.teamRepository.remove(team).then((role: Team) => {
                    if (!team) {
                        reject(new BadRequestResult(ErrorCode.UnknownError, 'It can not be eliminated!'));
                        return;
                    }
                    resolve(team);
                });
            }).catch((error) => {
                reject(new InternalServerErrorResult(ErrorCode.GeneralError, error));
            });
        });
    }   
}
