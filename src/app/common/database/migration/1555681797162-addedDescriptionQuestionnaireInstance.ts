import {MigrationInterface, QueryRunner} from "typeorm";

export class addedDescriptionQuestionnaireInstance1555681797162 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "questionnaire_instance" ADD "description" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "questionnaire_instance" DROP COLUMN "description"`);
    }

}
