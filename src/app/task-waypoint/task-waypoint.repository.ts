import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { TaskWaypoint } from "./task-waypoint.entity";
import { CreateTaskWaypointDto } from "./dto/create-task-waypoint.dto";
import { UpdateTaskWaypointDto } from "./dto/update-task-waypoint.dto";

@EntityRepository(TaskWaypoint)
export class TaskWaypointRepository extends Repository<TaskWaypoint> {

    async createTaskWaypoint(taskWaypointDto: CreateTaskWaypointDto) {
        const taskWaypoint: TaskWaypoint = this.create();
        taskWaypoint.name = taskWaypointDto.name;
        taskWaypoint.description = taskWaypointDto.description;
        taskWaypoint.updatedAt = new Date();
        taskWaypoint.createdAt = new Date();
        return this.save(taskWaypoint);
    }

    async updateTaskWaypoint(id: string, taskWaypointDto: UpdateTaskWaypointDto) {
        const taskWaypoint: TaskWaypoint = await this.getTaskWaypoint(id);
        taskWaypoint.name = taskWaypointDto.name? taskWaypoint.name : taskWaypoint.name;
        taskWaypoint.description = taskWaypointDto.description ? taskWaypoint.description : taskWaypoint.description;     
        taskWaypoint.updatedAt = new Date();
        return this.save(taskWaypoint);
    }
 
    getTaskWaypoint(id: string) {
        return this.findOne({ id });
    }

    getTaskWaypoints() {
        return this.find();
    }
}