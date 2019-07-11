import {MigrationInterface, QueryRunner} from "typeorm";

export class changeNullableColumns1558120397065 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "change" ALTER COLUMN "entityId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "change" ALTER COLUMN "entityDto" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "change" ALTER COLUMN "entityDto" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "change" ALTER COLUMN "entityId" SET NOT NULL`);
    }

}
