import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { TaskScheduler } from "./task-scheduler.entity";
import { CreateTaskSchedulerDto } from "./dto/create-task-scheduler.dto";
import { UpdateTaskSchedulerDto } from "./dto/update-task-scheduler.dto";

@EntityRepository(TaskScheduler)
export class TaskSchedulerRepository extends Repository<TaskScheduler> {

    async createTaskScheduler(taskSchedulerDto: CreateTaskSchedulerDto) {
        const taskScheduler: TaskScheduler = this.create();
        taskScheduler.name = taskSchedulerDto.name;
        taskScheduler.description = taskSchedulerDto.description;
        taskScheduler.updatedAt = new Date();
        taskScheduler.createdAt = new Date();
        return this.save(taskScheduler);
    }

    async updateTaskScheduler(id: string, taskSchedulerDto: UpdateTaskSchedulerDto) {
        const taskScheduler: TaskScheduler = await this.getTaskScheduler(id);
        taskScheduler.name = taskSchedulerDto.name? TaskScheduler.name : TaskScheduler.name;
        taskScheduler.description = taskSchedulerDto.description ? taskScheduler.description : taskScheduler.description;     
        taskScheduler.updatedAt = new Date();
        return this.save(taskScheduler);
    }
 
    getTaskScheduler(id: string) {
        return this.findOne({ id });
    }

    getTaskSchedulers() {
        return this.find();
    }
}