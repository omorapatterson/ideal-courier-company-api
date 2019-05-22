import { EntityRepository, Repository } from "typeorm";
import { TaskDriverWaypoint } from "./task-driver-waypoint.entity";
import { CreateTaskDriverWaypointDto } from "./dto/create-task-driver-waypoint.dto";
import { UpdateTaskDriverWaypointDto } from "./dto/update-task-driver-waypoint.dto";

@EntityRepository(TaskDriverWaypoint)
export class TaskDriverWaypointRepository extends Repository<TaskDriverWaypoint> {

    async createtaskDriverWaypoint(taskDriverWaypointDto: CreateTaskDriverWaypointDto) {
        const taskDriverWaypoint: TaskDriverWaypoint = this.create();
        taskDriverWaypoint.name = taskDriverWaypointDto.name;
        taskDriverWaypoint.description = taskDriverWaypointDto.description;
        taskDriverWaypoint.updatedAt = new Date();
        taskDriverWaypoint.createdAt = new Date();
        return this.save(taskDriverWaypoint);
    }

    async updatetaskDriverWaypoint(id: string, taskDriverWaypointDto: UpdateTaskDriverWaypointDto) {
        const taskDriverWaypoint: TaskDriverWaypoint = await this.gettaskDriverWaypoint(id);
        taskDriverWaypoint.name = taskDriverWaypointDto.name? taskDriverWaypoint.name : taskDriverWaypoint.name;
        taskDriverWaypoint.description = taskDriverWaypointDto.description ? taskDriverWaypoint.description : taskDriverWaypoint.description;     
        taskDriverWaypoint.updatedAt = new Date();
        return this.save(taskDriverWaypoint);
    }
 
    gettaskDriverWaypoint(id: string) {
        return this.findOne({ id });
    }

    gettaskDriverWaypoints() {
        return this.find();
    }
}