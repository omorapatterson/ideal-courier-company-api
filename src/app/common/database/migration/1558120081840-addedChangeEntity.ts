import {MigrationInterface, QueryRunner} from "typeorm";

export class addedChangeEntity1558120081840 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TYPE "change_type_enum" AS ENUM('theme', 'subject', 'question')`);
        await queryRunner.query(`CREATE TYPE "change_status_enum" AS ENUM('pending', 'accepted', 'denied')`);
        await queryRunner.query(`CREATE TYPE "change_action_enum" AS ENUM('edit', 'add', 'delete')`);
        await queryRunner.query(`CREATE TABLE "change" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "change_type_enum" NOT NULL, "status" "change_status_enum" NOT NULL DEFAULT 'pending', "action" "change_action_enum" NOT NULL, "entityId" character varying NOT NULL, "entityDto" text NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "userId" uuid, CONSTRAINT "PK_38168d337b66a2d98e059fe5820" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "change" ADD CONSTRAINT "FK_904f678b88da3039bd9f604f4c5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "change" DROP CONSTRAINT "FK_904f678b88da3039bd9f604f4c5"`);
        await queryRunner.query(`DROP TABLE "change"`);
        await queryRunner.query(`DROP TYPE "change_action_enum"`);
        await queryRunner.query(`DROP TYPE "change_status_enum"`);
        await queryRunner.query(`DROP TYPE "change_type_enum"`);
    }

}
