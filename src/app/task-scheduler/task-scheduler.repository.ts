import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { TaskScheduler } from "./task-scheduler.entity";
import { CreateSchedulerDto } from "./dto/create-task-scheduler.dto";
import { UpdateSchedulerDto } from "./dto/update-task-scheduler.dto";

@EntityRepository(TaskScheduler)
export class TaskSchedulerRepository extends Repository<TaskScheduler> {

    async createTaskScheduler(taskSchedulerDto: CreateSchedulerDto) {
        const taskScheduler: TaskScheduler = this.create();
        taskScheduler.finish = taskSchedulerDto.finish;
        taskScheduler.finishAfterRepetitions = taskSchedulerDto.finishAfterRepetitions;
        //taskScheduler.finishDate = taskSchedulerDto.finishDate;
        taskScheduler.intervalTime = taskSchedulerDto.intervalTime;
        taskScheduler.monthOption = taskSchedulerDto.monthOption;
        taskScheduler.repeatEach = taskSchedulerDto.repeatEach;
        taskScheduler.repetitions = taskSchedulerDto.repetitions;
        taskScheduler.monday = taskSchedulerDto.monday;
        taskScheduler.thursday = taskSchedulerDto.thursday;
        taskScheduler.tuesday = taskSchedulerDto.tuesday;
        taskScheduler.wednesday = taskSchedulerDto.wednesday;
        taskScheduler.friday = taskSchedulerDto.friday;
        taskScheduler.saturday = taskSchedulerDto.saturday;
        taskScheduler.sunday = taskSchedulerDto.sunday;

        taskScheduler.updatedAt = new Date();
        taskScheduler.createdAt = new Date();
        return this.save(taskScheduler);
    }

    async updateTaskScheduler(id: string, taskSchedulerDto: UpdateSchedulerDto) {
        const taskScheduler: TaskScheduler = await this.getTaskScheduler(id);
        //taskScheduler.name = taskSchedulerDto.name? TaskScheduler.name : TaskScheduler.name;
        //taskScheduler.description = taskSchedulerDto.description ? taskScheduler.description : taskScheduler.description;     
        taskScheduler.updatedAt = new Date();
        return this.save(taskScheduler);
    }

    getTaskScheduler(id: string) {
        return this.findOne({ id });
    }

    getTaskSchedulerByTaskId(taskId: string) {
        return this.createQueryBuilder('taskScheduler')
            .select()
            .where('taskScheduler.task = :task', { taskId })
            .getOne();
    }

    getTaskSchedulers() {
        return this.find();
    }
}