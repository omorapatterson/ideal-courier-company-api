import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { DriverLog } from "./driver-log.entity";
import { CreateDriverLogDto } from "./dto/create-driver-log.dto";
import { UpdateDriverLogDto } from "./dto/update-driver-log.dto";

@EntityRepository(DriverLog)
export class DriverLogRepository extends Repository<DriverLog> {

    async createDriverLog(driverLogDto: CreateDriverLogDto) {
        const driverLog: DriverLog = this.create();
        driverLog.name = driverLogDto.name;
        driverLog.description = driverLogDto.description;
        driverLog.createdAt = new Date();
        return this.save(driverLog);
    }

    async updateDriverLog(id: string, driverLogDto: UpdateDriverLogDto) {
        const driverLog: DriverLog = await this.getDriverLog(id);
        driverLog.name = driverLogDto.name? DriverLog.name : driverLog.name;
        driverLog.description = driverLogDto.description ? driverLog.description : driverLog.description;     
        return this.save(driverLog);
    }
 
    getDriverLog(id: string) {
        return this.findOne({ id });
    }

    getDriverLogs() {
        return this.find();
    }
}