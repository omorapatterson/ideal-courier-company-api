import { EntityRepository, Repository } from "typeorm";
import { TaskDriver } from "./task-driver.entity";
import { CreateTaskDriverDto } from "./dto/create-task-driver.dto";
import { UpdateTaskDriverDto } from "./dto/update-task-driver.dto";

@EntityRepository(TaskDriver)
export class TaskDriverRepository extends Repository<TaskDriver> {

    async createtaskDriver(taskDriverDto: CreateTaskDriverDto) {
        const taskDriver: TaskDriver = this.create();
        taskDriver.description = taskDriverDto.description;
        taskDriver.updatedAt = new Date();
        taskDriver.createdAt = new Date();
        return this.save(taskDriver);
    }

    async updatetaskDriver(id: string, taskDriverDto: UpdateTaskDriverDto) {
        const taskDriver: TaskDriver = await this.gettaskDriver(id);
        taskDriver.description = taskDriverDto.description ? taskDriver.description : taskDriver.description;     
        taskDriver.updatedAt = new Date();
        return this.save(taskDriver);
    }
 
    gettaskDriver(id: string) {
        return this.findOne({ id });
    }

    gettaskDrivers() {
        return this.find();
    }
}