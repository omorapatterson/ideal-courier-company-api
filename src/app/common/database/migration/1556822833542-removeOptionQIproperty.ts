import {MigrationInterface, QueryRunner} from "typeorm";

export class removeOptionQIproperty1556822833542 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "response" DROP COLUMN "options"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "response" ADD "options" text NOT NULL`);
    }

}
