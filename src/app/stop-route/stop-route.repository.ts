import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { StopRoute } from "./stop-route.entity";
import { CreateStopRouteDto } from "./dto/create-stop-route.dto";
import { UpdateStopRouteDto } from "./dto/update-stop-route.dto";

@EntityRepository(StopRoute)
export class StopRouteRepository extends Repository<StopRoute> {

    async createStopRoute(stopRouteDto: CreateStopRouteDto) {
        const stopRoute: StopRoute = this.create();
        stopRoute.description = stopRouteDto.description;
        stopRoute.updatedAt = new Date();
        stopRoute.createdAt = new Date();
        return this.save(stopRoute);
    }

    async updateStopRoute(id: string, stopRouteDto: UpdateStopRouteDto) {
        const stopRoute: StopRoute = await this.getRole(id);
        stopRoute.description = stopRouteDto.description ? stopRouteDto.description : stopRoute.description;       
        stopRoute.updatedAt = new Date();
        return this.save(stopRoute);
    }
 
    getRole(id: string) {
        return this.findOne({ id });
    }

    getRoles() {
        return this.find();
    }
}