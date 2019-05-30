import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { Driver } from "./driver.entity";
import { CreateDriverDto } from "./dto/create-driver.dto";
import { UpdateDriverDto } from "./dto/update-driver.dto";

@EntityRepository(Driver)
export class DriverRepository extends Repository<Driver> {

    async createDriver(driverDto: CreateDriverDto) {
        const driver: Driver = this.create();
        driver.firstName = driverDto.firstName;
        driver.lastName = driverDto.lastName;
        driver.email = driverDto.email;
        driver.phone = driverDto.phone;
        const salt: string = bcrypt.genSaltSync(10);
        driver.password = await bcrypt.hash(driverDto.password, salt);
        driver.company = <any>{ id: driverDto.companyId };
        driver.team = <any>{ id: driverDto.teamId };
        driver.updatedAt = new Date();
        driver.createdAt = new Date();
        return this.save(driver);
    }

    async updateDriver(id: string, driverDto: UpdateDriverDto) {
        const driver: Driver = await this.getDriver(id);
        driver.firstName = driverDto.firstName ? driverDto.firstName : driver.firstName;
        driver.lastName = driverDto.lastName ? driverDto.lastName : driver.lastName;
        driver.email = driverDto.email ? driverDto.email : driver.email;

        if (driverDto.password) {
            const salt: string = bcrypt.genSaltSync(10);
            driver.password = await bcrypt.hash(driverDto.password, salt);
        }

        if (driverDto.companyId) {
            driver.company = <any>{ id: driverDto.companyId };
        }

        if (driverDto.teamId) {
            driver.team = <any>{ id: driverDto.teamId };
        }

        driver.updatedAt = new Date();
        return this.save(driver);
    }

    async signIn(email: string, password: string) {
        let driver: Driver = await this.getDriverByEmail(email);
        if (!driver) {
            return driver;
        }
        const isPasswordMatching = await bcrypt.compare(password, driver.password);
        if (!isPasswordMatching) {
            driver = undefined;
        }
        return driver;
    }

    getDriver(id: string) {
        return this.createQueryBuilder("user")
            .select()
            .where("user.id = :id", { id })
            .andWhere("user.isDeleted = false")
            .getOne();
    }

    getDrivers() {
        return this.createQueryBuilder("driver")
        .select()
        .where("driver.isDeleted = false")
        .getMany();
    }

    getDriverByEmail(email: string) {
        return this.createQueryBuilder("driver")
            .select()
            .where("driver.email = :email", { email })
            .andWhere("driver.isDeleted = false")
            .getOne();
    }

    async deleteDriver(driver: Driver) {
        driver.isDeleted = true;
        driver.updatedAt = new Date();
        return this.save(driver);
    }
}