import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { Permision } from "./permision.entity";
import { CreatePermisionDto } from "./dto/permision.dto";
import { UpdatePermisionDto } from "./dto/update-permision.dto";

@EntityRepository(Permision)
export class PermisionRepository extends Repository<Permision> {

    async createPermision(permisionDto: CreatePermisionDto) {
        const permision: Permision = this.create();
        permision.name = permisionDto.name;
        permision.description = permisionDto.description;
        permision.updatedAt = new Date();
        permision.createdAt = new Date();
        return this.save(permision);
    }

    async updatePermision(id: string, permisionDto: UpdatePermisionDto) {
        const permision: Permision = await this.getPermision(id);
        permision.name = permisionDto.name? permisionDto.name : permision.name;
        permision.description = permisionDto.description ? permisionDto.description : permision.description;       
        permision.updatedAt = new Date();
        return this.save(permision);
    }
 
    getPermision(id: string) {
        return this.findOne({ id });
    }

    getPermisions() {
        return this.find();
    }
}