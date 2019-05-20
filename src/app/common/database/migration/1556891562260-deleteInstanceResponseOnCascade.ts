import {MigrationInterface, QueryRunner} from "typeorm";

export class deleteInstanceResponseOnCascade1556891562260 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "response" DROP CONSTRAINT "FK_5b7e5db20fea12359657949f419"`);
        await queryRunner.query(`ALTER TABLE "response" ADD CONSTRAINT "FK_5b7e5db20fea12359657949f419" FOREIGN KEY ("questionnaireInstanceId") REFERENCES "questionnaire_instance"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "response" DROP CONSTRAINT "FK_5b7e5db20fea12359657949f419"`);
        await queryRunner.query(`ALTER TABLE "response" ADD CONSTRAINT "FK_5b7e5db20fea12359657949f419" FOREIGN KEY ("questionnaireInstanceId") REFERENCES "questionnaire_instance"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
