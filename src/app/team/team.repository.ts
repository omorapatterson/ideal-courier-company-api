import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { Team } from "./team.entity";
import { CreateTeamDto } from "./dto/team.dto";
import { UpdateTeamDto } from "./dto/update-team.dto";

@EntityRepository(Team)
export class TeamRepository extends Repository<Team> {

    async createTeam(teamDto: CreateTeamDto) {
        const team: Team = this.create();
        team.name = teamDto.name;
        team.description = teamDto.description;
        team.updatedAt = new Date();
        team.createdAt = new Date();
        return this.save(team);
    }

    async updateTeam(id: string, teamDto: UpdateTeamDto) {
        const team: Team = await this.getTeam(id);
        team.name = teamDto.name? teamDto.name : team.name;
        team.description = teamDto.description ? teamDto.description : team.description;     
        team.updatedAt = new Date();
        return this.save(team);
    }
 
    getTeam(id: string) {
        return this.findOne({ id });
    }

    getTeams() {
        return this.find();
    }
}