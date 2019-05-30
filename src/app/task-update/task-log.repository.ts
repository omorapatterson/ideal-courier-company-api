import { EntityRepository, Repository } from "typeorm";
import { TaskLog } from "./task-log.entity";
import { CreateTaskLogDto } from "./dto/create-task-log.dto";
import { UpdateTaskLogDto } from "./dto/update-task-log.dto";

@EntityRepository(TaskLog)
export class TaskLogRepository extends Repository<TaskLog> {

    async createtaskLog(taskLogDto: CreateTaskLogDto) {
        const taskLog: TaskLog = this.create();
        taskLog.description = taskLogDto.description;
        taskLog.updatedAt = new Date();
        taskLog.createdAt = new Date();
        return this.save(taskLog);
    }

    async updatetaskLog(id: string, taskLogDto: UpdateTaskLogDto) {
        const taskLog: TaskLog = await this.gettaskLog(id);
        taskLog.description = taskLogDto.description ? taskLog.description : taskLog.description;     
        taskLog.updatedAt = new Date();
        return this.save(taskLog);
    }
 
    gettaskLog(id: string) {
        return this.findOne({ id });
    }

    gettaskLogs() {
        return this.find();
    }
}