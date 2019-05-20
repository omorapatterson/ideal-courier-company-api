import {MigrationInterface, QueryRunner} from "typeorm";

export class addedNameQuestionnaireInstance1555680367390 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "questionnaire_instance" ADD "name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "questionnaire_instance" DROP COLUMN "name"`);
    }

}
