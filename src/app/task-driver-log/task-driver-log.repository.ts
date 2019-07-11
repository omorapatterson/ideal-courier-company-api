import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { TaskDriverLog } from "./task-driver-log.entity";
import { CreateTaskDriverLogDto } from "./dto/create-task-driver-log.dto";
import { UpdateTaskDriverLogDto } from "./dto/update-task-driver-log.dto";

@EntityRepository(TaskDriverLog)
export class TaskDriverLogRepository extends Repository<TaskDriverLog> {

    async createTaskDriverLog(taskDriverLogDto: CreateTaskDriverLogDto) {
        const taskDriverLog: TaskDriverLog = this.create();
        taskDriverLog.name = taskDriverLogDto.name;
        taskDriverLog.description = taskDriverLogDto.description;
        taskDriverLog.updatedAt = new Date();
        taskDriverLog.createdAt = new Date();
        return this.save(taskDriverLog);
    }

    async updateTaskDriverLog(id: string, taskDriverLogDto: UpdateTaskDriverLogDto) {
        const taskDriverLog: TaskDriverLog = await this.getTaskDriverLog(id);
        taskDriverLog.name = taskDriverLogDto.name? TaskDriverLog.name : taskDriverLog.name;
        taskDriverLog.description = taskDriverLogDto.description ? taskDriverLog.description : taskDriverLog.description;     
        taskDriverLog.updatedAt = new Date();
        return this.save(taskDriverLog);
    }
 
    getTaskDriverLog(id: string) {
        return this.findOne({ id });
    }

    getTaskDriverLogs() {
        return this.find();
    }
}