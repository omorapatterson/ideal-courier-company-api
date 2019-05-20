import {MigrationInterface, QueryRunner} from "typeorm";

export class addedUUIDQuestionnaireSubject1556917863950 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "questionnaire_subject" DROP CONSTRAINT "PK_ef989cebfc07d3961ac31b3c074"`);
        await queryRunner.query(`ALTER TABLE "questionnaire_subject" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "questionnaire_subject" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "questionnaire_subject" ADD CONSTRAINT "PK_ef989cebfc07d3961ac31b3c074" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "questionnaire_subject" DROP CONSTRAINT "PK_ef989cebfc07d3961ac31b3c074"`);
        await queryRunner.query(`ALTER TABLE "questionnaire_subject" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "questionnaire_subject" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "questionnaire_subject" ADD CONSTRAINT "PK_ef989cebfc07d3961ac31b3c074" PRIMARY KEY ("id")`);
    }

}
