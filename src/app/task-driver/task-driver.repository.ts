import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { TaskDriver } from "./task-driver.entity";
import { User } from '../user/user.entity';
import { CreateTaskDriverDto } from "./dto/create-task-driver.dto";
import { UpdateTaskDriverDto } from "./dto/update-task-driver.dto";

@EntityRepository(TaskDriver)
export class TaskDriverRepository extends Repository<TaskDriver> {

    async createTaskDriver(user: User, taskDto: CreateTaskDriverDto) {
        const task: TaskDriver = this.create();
        task.company = <any>{ id: user.company.id };
        task.description = taskDto.description;
        task.comments = taskDto.comments;
        task.lat = taskDto.lat;
        task.lon = taskDto.lon;
        task.ipAddress = taskDto.ipAddress;
        task.pieces = taskDto.pieces;
        task.taskDate = taskDto.taskDate;
        task.transType = taskDto.transType;
        //task.sheduler = <any>{ id: taskSchedulerId };
        task.updatedAt = new Date();
        task.createdAt = new Date();
        return this.save(task);
    }

    async updateTaskDriver(id: string, taskDto: UpdateTaskDriverDto) {
        const task: TaskDriver = await this.getTaskDriver(id);
        task.description = taskDto.description ? taskDto.description : task.description;
        task.updatedAt = new Date();
        return this.save(task);
    }

    getTaskDriver(id: string) {
        return this.findOne({ id });
    }

    getTaskDrivers(user: User) {
        let query = this.createQueryBuilder('task')
            .select()
            .leftJoinAndSelect('task.company', 'company')
            .leftJoinAndSelect('task.sheduler', 'sheduler')
            .where( 'company.id = :companyId', { companyId: user.company.id })
        return query.getMany();
    }
}