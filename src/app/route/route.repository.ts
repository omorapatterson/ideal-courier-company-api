import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { Route } from "./route.entity";
import { CreateRouteDto } from "./dto/create-route.dto";
import { UpdateRouteDto } from "./dto/update-route.dto";

@EntityRepository(Route)
export class RouteRepository extends Repository<Route> {

    async createRoute(routeDto: CreateRouteDto) {
        const route: Route = this.create();
        route.name = routeDto.name;
        route.description = routeDto.description;
        route.updatedAt = new Date();
        route.createdAt = new Date();
        return this.save(route);
    }

    async updateRoute(id: string, routeDto: UpdateRouteDto) {
        const route: Route = await this.getRole(id);
        route.name = routeDto.name? routeDto.name : route.name;
        route.description = routeDto.description ? routeDto.description : route.description;       
        route.updatedAt = new Date();
        return this.save(route);
    }
 
    getRole(id: string) {
        return this.findOne({ id });
    }

    getRoles() {
        return this.find();
    }
}