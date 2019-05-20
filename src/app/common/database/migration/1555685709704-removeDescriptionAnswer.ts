import {MigrationInterface, QueryRunner} from "typeorm";

export class removeDescriptionAnswer1555685709704 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "answer" DROP COLUMN "description"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "answer" ADD "description" text NOT NULL`);
    }

}
