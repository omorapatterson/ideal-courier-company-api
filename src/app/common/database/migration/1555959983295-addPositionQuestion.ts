import {MigrationInterface, QueryRunner} from "typeorm";

export class addPositionQuestion1555959983295 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "question" ADD "position" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "position"`);
    }

}
