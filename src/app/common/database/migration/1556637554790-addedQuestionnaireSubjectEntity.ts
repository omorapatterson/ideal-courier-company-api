import {MigrationInterface, QueryRunner} from "typeorm";

export class addedQuestionnaireSubjectEntity1556637554790 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "questionnaire_subject" ("id" SERIAL NOT NULL, "position" integer NOT NULL, "subjectId" uuid, "questionnaireId" uuid, CONSTRAINT "PK_ef989cebfc07d3961ac31b3c074" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "response" ADD "position" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "questionnaire" ADD "subjectsId" uuid`);
        await queryRunner.query(`ALTER TABLE "subject" ADD "questionnairesId" integer`);
        await queryRunner.query(`ALTER TABLE "questionnaire" ADD CONSTRAINT "FK_b14e5cbe93eb77091aa90f96b4d" FOREIGN KEY ("subjectsId") REFERENCES "subject"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "questionnaire_subject" ADD CONSTRAINT "FK_6e59fb08a931a6b78cb275fc2c7" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "questionnaire_subject" ADD CONSTRAINT "FK_687f21659b398e0a55f8e889206" FOREIGN KEY ("questionnaireId") REFERENCES "questionnaire"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subject" ADD CONSTRAINT "FK_8aaa74103b4b4e8bfcd4bf9e6ed" FOREIGN KEY ("questionnairesId") REFERENCES "questionnaire_subject"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "subject" DROP CONSTRAINT "FK_8aaa74103b4b4e8bfcd4bf9e6ed"`);
        await queryRunner.query(`ALTER TABLE "questionnaire_subject" DROP CONSTRAINT "FK_687f21659b398e0a55f8e889206"`);
        await queryRunner.query(`ALTER TABLE "questionnaire_subject" DROP CONSTRAINT "FK_6e59fb08a931a6b78cb275fc2c7"`);
        await queryRunner.query(`ALTER TABLE "questionnaire" DROP CONSTRAINT "FK_b14e5cbe93eb77091aa90f96b4d"`);
        await queryRunner.query(`ALTER TABLE "subject" DROP COLUMN "questionnairesId"`);
        await queryRunner.query(`ALTER TABLE "questionnaire" DROP COLUMN "subjectsId"`);
        await queryRunner.query(`ALTER TABLE "response" DROP COLUMN "position"`);
        await queryRunner.query(`DROP TABLE "questionnaire_subject"`);
    }

}
