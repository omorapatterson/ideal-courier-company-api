import {MigrationInterface, QueryRunner} from "typeorm";

export class changeEntityDtoNotText1558124753058 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "change" DROP COLUMN "entityDto"`);
        await queryRunner.query(`ALTER TABLE "change" ADD "entityDto" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "change" DROP COLUMN "entityDto"`);
        await queryRunner.query(`ALTER TABLE "change" ADD "entityDto" text`);
    }

}
