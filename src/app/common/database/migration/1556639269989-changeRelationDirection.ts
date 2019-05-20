import {MigrationInterface, QueryRunner} from "typeorm";

export class changeRelationDirection1556639269989 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "questionnaire" DROP CONSTRAINT "FK_b14e5cbe93eb77091aa90f96b4d"`);
        await queryRunner.query(`ALTER TABLE "subject" DROP CONSTRAINT "FK_8aaa74103b4b4e8bfcd4bf9e6ed"`);
        await queryRunner.query(`ALTER TABLE "questionnaire" DROP COLUMN "subjectsId"`);
        await queryRunner.query(`ALTER TABLE "subject" DROP COLUMN "questionnairesId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "subject" ADD "questionnairesId" integer`);
        await queryRunner.query(`ALTER TABLE "questionnaire" ADD "subjectsId" uuid`);
        await queryRunner.query(`ALTER TABLE "subject" ADD CONSTRAINT "FK_8aaa74103b4b4e8bfcd4bf9e6ed" FOREIGN KEY ("questionnairesId") REFERENCES "questionnaire_subject"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "questionnaire" ADD CONSTRAINT "FK_b14e5cbe93eb77091aa90f96b4d" FOREIGN KEY ("subjectsId") REFERENCES "subject"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
