import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { Stop } from "./stop.entity";
import { CreateStopDto } from "./dto/create-stop.dto";
import { UpdateStopDto } from "./dto/update-stop.dto";

@EntityRepository(Stop)
export class StopRepository extends Repository<Stop> {

    async createStop(stopDto: CreateStopDto) {
        const stop: Stop = this.create();
        stop.name = stopDto.name;
        stop.description = stopDto.description;
        stop.updatedAt = new Date();
        stop.createdAt = new Date();
        return this.save(stop);
    }

    async updateStop(id: string, stopDto: UpdateStopDto) {
        const stop: Stop = await this.getRole(id);
        stop.name = stopDto.name? stopDto.name : stop.name;
        stop.description = stopDto.description ? stopDto.description : stop.description;       
        stop.updatedAt = new Date();
        return this.save(stop);
    }
 
    getRole(id: string) {
        return this.findOne({ id });
    }

    getRoles() {
        return this.find();
    }
}