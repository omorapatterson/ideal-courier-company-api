import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { Role } from "./role.entity";
import { CreateRoleDto } from "./dto/role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {

    async createRole(roleDto: CreateRoleDto) {
        const role: Role = this.create();
        role.name = roleDto.name;
        role.description = roleDto.description;
        role.updatedAt = new Date();
        role.createdAt = new Date();
        return this.save(role);
    }

    async updateRole(id: string, roleDto: UpdateRoleDto) {
        const role: Role = await this.getRole(id);
        role.name = roleDto.name? roleDto.name : role.name;
        role.description = roleDto.description ? roleDto.description : role.description;       
        role.updatedAt = new Date();
        return this.save(role);
    }
 
    getRole(id: string) {
        return this.findOne({ id });
    }

    getRoles() {
        return this.find();
    }
}