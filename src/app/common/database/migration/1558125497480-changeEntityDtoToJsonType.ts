import {MigrationInterface, QueryRunner} from "typeorm";

export class changeEntityDtoToJsonType1558125497480 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "change" DROP COLUMN "entityDto"`);
        await queryRunner.query(`ALTER TABLE "change" ADD "entityDto" json`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "change" DROP COLUMN "entityDto"`);
        await queryRunner.query(`ALTER TABLE "change" ADD "entityDto" character varying`);
    }

}
