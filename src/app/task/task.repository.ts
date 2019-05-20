import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { Task } from "./Task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-Task.dto";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    async createTask(taskDto: CreateTaskDto) {
        const task: Task = this.create();
        task.name = taskDto.name;
        task.description = taskDto.description;
        task.updatedAt = new Date();
        task.createdAt = new Date();
        return this.save(task);
    }

    async updateTask(id: string, taskDto: UpdateTaskDto) {
        const task: Task = await this.getTask(id);
        task.name = taskDto.name? taskDto.name : task.name;
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