import {
    Controller,
    Get,
    Post,
    Body,
    UseGuards,
    Put,
    Param,
    Delete,
    UsePipes
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
//
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { RolesGuard } from '../common/auth/guards/roles.guard';
import { Roles } from '../common/decorator/roles.decorator';
import { ErrorResult } from '../common/error-manager/errors';
import { ErrorManager } from '../common/error-manager/error-manager';
//
import { CreateTeamDto } from './dto/team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { ITeam } from './interfaces/team.interface';
import { Team } from './team.entity';
import { TeamService } from './team.service';

@Controller('teams')
//@UseGuards(AuthGuard(), RolesGuard)
export class TeamController {

    constructor(private readonly teamService: TeamService) { }

    @Post()
    //@Roles('expert')
    @UsePipes(new ValidationPipe())
    async create(@Body() team: CreateTeamDto) {
        return this.teamService.create(team)
            .then((team: Team) => {
                return this.getITeam(team);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Put(':id')
    //@Roles('expert')
    @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
    async update(@Param('id') id: string, @Body() team: UpdateTeamDto) {
        return this.teamService.update(id, team)
            .then((team: Team) => {
                return this.getITeam(team);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Get(':id')
    async getTeam(@Param('id') id: string) {
        return this.teamService.getTeam(id)
            .then((team: Team) => {
                return { data: this.getITeam(team) };
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Get()
    //@Roles('expert')
    async getTeams() {
        return this.teamService.getTeams()
            .then((teams: Team[]) => {
                return {
                    data: teams.map((team: Team) => {
                        return this.getITeam(team);
                    })
                }
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Delete(':id')
    //@Roles('expert')
    async delete(@Param('id') id: string) {
        return this.teamService.delete(id)
            .then((team: Team) => {
                return this.getITeam(team);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    getITeam(team: Team): ITeam {
        return {
            id: team.id,
            name: team.name,
            description: team.description,
            createdAt: team.createdAt,
            updatedAt: team.updatedAt
        };
    }
}
