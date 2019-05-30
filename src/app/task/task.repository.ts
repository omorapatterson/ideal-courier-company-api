import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    async createTask(taskDto: CreateTaskDto) {
        const task: Task = this.create();
        task.description = taskDto.description;
        task.comments = taskDto.comments;
        task.lat = taskDto.lat;
        task.lon = taskDto.lon;
        task.ipAddress = taskDto.ipAddress;
        task.pieces = taskDto.pieces;
        task.taskDate = taskDto.taskDate;
        task.transType = taskDto.transType;
        task.updatedAt = new Date();
        task.createdAt = new Date();
        return this.save(task);
    }

    async updateTask(id: string, taskDto: UpdateTaskDto) {
        const task: Task = await this.getTask(id);
        task.description = taskDto.description ? taskDto.description : task.description;     
        task.updatedAt = new Date();
        return this.save(task);
    }
 
    getTask(id: string) {
        return this.findOne({ id });
    }

    getTasks() {
        return this.find();
    }
}