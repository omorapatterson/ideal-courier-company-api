import {MigrationInterface, QueryRunner} from "typeorm";

export class cascadeDeleteCompanyAndQuestion1556203707394 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "questionnaire_instance" DROP CONSTRAINT "FK_b4556383106c1116778b7efeac8"`);
        await queryRunner.query(`ALTER TABLE "answer" DROP CONSTRAINT "FK_a4013f10cd6924793fbd5f0d637"`);
        await queryRunner.query(`ALTER TABLE "action" DROP CONSTRAINT "FK_38c87a05b89d8cb2658d0542c92"`);
        await queryRunner.query(`ALTER TABLE "questionnaire_instance" ADD CONSTRAINT "FK_b4556383106c1116778b7efeac8" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answer" ADD CONSTRAINT "FK_a4013f10cd6924793fbd5f0d637" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "action" ADD CONSTRAINT "FK_38c87a05b89d8cb2658d0542c92" FOREIGN KEY ("answerId") REFERENCES "answer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "action" DROP CONSTRAINT "FK_38c87a05b89d8cb2658d0542c92"`);
        await queryRunner.query(`ALTER TABLE "answer" DROP CONSTRAINT "FK_a4013f10cd6924793fbd5f0d637"`);
        await queryRunner.query(`ALTER TABLE "questionnaire_instance" DROP CONSTRAINT "FK_b4556383106c1116778b7efeac8"`);
        await queryRunner.query(`ALTER TABLE "action" ADD CONSTRAINT "FK_38c87a05b89d8cb2658d0542c92" FOREIGN KEY ("answerId") REFERENCES "answer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answer" ADD CONSTRAINT "FK_a4013f10cd6924793fbd5f0d637" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "questionnaire_instance" ADD CONSTRAINT "FK_b4556383106c1116778b7efeac8" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
