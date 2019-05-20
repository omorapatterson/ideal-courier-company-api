import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { TaskLog } from "./task-log.entity";
import { CreateTaskLogDto } from "./dto/create-task-log.dto";
import { UpdateTaskLogDto } from "./dto/update-task-log.dto";

@EntityRepository(TaskLog)
export class TaskLogRepository extends Repository<TaskLog> {

    async createTaskLog(taskLogDto: CreateTaskLogDto) {
        const taskLog: TaskLog = this.create();
        taskLog.name = taskLogDto.name;
        taskLog.description = taskLogDto.description;
        taskLog.updatedAt = new Date();
        taskLog.createdAt = new Date();
        return this.save(taskLog);
    }

    async updateTaskLog(id: string, taskLogDto: UpdateTaskLogDto) {
        const taskLog: TaskLog = await this.getTaskLog(id);
        taskLog.name = taskLogDto.name? TaskLog.name : taskLog.name;
        taskLog.description = taskLogDto.description ? taskLog.description : taskLog.description;     
        taskLog.updatedAt = new Date();
        return this.save(taskLog);
    }
 
    getTaskLog(id: string) {
        return this.findOne({ id });
    }

    getTaskLogs() {
        return this.find();
    }
}