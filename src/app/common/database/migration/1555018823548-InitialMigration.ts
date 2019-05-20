import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1555018823548 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "theme" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" text NOT NULL, "score" integer NOT NULL DEFAULT 0, "answersNumber" integer NOT NULL DEFAULT 0, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_c1934d0b4403bf10c1ab0c18166" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "response" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "options" text NOT NULL, "score" integer NOT NULL, "notAbleToAnswer" boolean NOT NULL DEFAULT false, "questionIsNotUseful" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "answerId" character varying, "questionnaireInstanceId" uuid, "questionId" uuid, CONSTRAINT "PK_f64544baf2b4dc48ba623ce768f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "questionnaire_instance" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "obsolete" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "questionnaireId" uuid, "companyId" uuid, CONSTRAINT "PK_a2d098d99ec2cc77a5b70843c1f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "user_role_enum" AS ENUM('root', 'expert', 'adviser', 'company')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying(50) NOT NULL, "lastName" character varying(50) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "user_role_enum" NOT NULL DEFAULT 'adviser', "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "activity_sector" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sector" character varying NOT NULL, "description" text NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_77933457dfcb2f851c75a36a370" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "zip" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "companySizeId" uuid, "ownerUserId" uuid, "userId" uuid, "activitySectorId" uuid, CONSTRAINT "REL_c41a1d36702f2cd0403ce58d33" UNIQUE ("userId"), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company_size" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "size" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_661591aa2fa767cf83884d405a3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "questionnaire" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" text NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "companySizeId" uuid, CONSTRAINT "PK_e8232a11eaabac903636eb7e71e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subject" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" text NOT NULL, "score" integer NOT NULL DEFAULT 0, "answersNumber" integer NOT NULL DEFAULT 0, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "themeId" uuid, "activitySectorId" uuid, CONSTRAINT "PK_12eee115462e38d62e5455fc054" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "question" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "question" text NOT NULL, "description" text NOT NULL, "score" integer NOT NULL DEFAULT 0, "answersNumber" integer NOT NULL DEFAULT 0, "active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "subjectId" uuid, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "answer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "answer" text NOT NULL, "description" text NOT NULL, "position" integer NOT NULL, "scoreValue" integer NOT NULL, "active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "questionId" uuid, CONSTRAINT "PK_9232db17b63fb1e94f97e5c224f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "action" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" text NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "answerId" uuid, CONSTRAINT "REL_38c87a05b89d8cb2658d0542c9" UNIQUE ("answerId"), CONSTRAINT "PK_2d9db9cf5edfbbae74eb56e3a39" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subject_questionnaire" ("questionnaireId" uuid NOT NULL, "subjectId" uuid NOT NULL, CONSTRAINT "PK_a3fe8f985d2931889d365971a74" PRIMARY KEY ("questionnaireId", "subjectId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_31466819f11ff9f59ff2e6d6b1" ON "subject_questionnaire" ("questionnaireId") `);
        await queryRunner.query(`CREATE INDEX "IDX_543b3530b77fc9a57e82c17afa" ON "subject_questionnaire" ("subjectId") `);
        await queryRunner.query(`ALTER TABLE "response" ADD CONSTRAINT "FK_5b7e5db20fea12359657949f419" FOREIGN KEY ("questionnaireInstanceId") REFERENCES "questionnaire_instance"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "response" ADD CONSTRAINT "FK_dfd952a4d26cf661248efec5f37" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "questionnaire_instance" ADD CONSTRAINT "FK_3f8992ceb610660336883b636b7" FOREIGN KEY ("questionnaireId") REFERENCES "questionnaire"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "questionnaire_instance" ADD CONSTRAINT "FK_b4556383106c1116778b7efeac8" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_9bdc025ccd3babaddf068d7ad06" FOREIGN KEY ("companySizeId") REFERENCES "company_size"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_64a4f1809ccb037b28a730153b8" FOREIGN KEY ("ownerUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_c41a1d36702f2cd0403ce58d33a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_058c8088c47775238167dce33f4" FOREIGN KEY ("activitySectorId") REFERENCES "activity_sector"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "questionnaire" ADD CONSTRAINT "FK_1b9c8d4e96b2336dd556d31eaf9" FOREIGN KEY ("companySizeId") REFERENCES "company_size"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subject" ADD CONSTRAINT "FK_db3e4bb8d8ac44b96644c674cbb" FOREIGN KEY ("themeId") REFERENCES "theme"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subject" ADD CONSTRAINT "FK_49ad15d1508f20fe87e7de202f6" FOREIGN KEY ("activitySectorId") REFERENCES "activity_sector"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_e924e3b8137111256e04c8f7500" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answer" ADD CONSTRAINT "FK_a4013f10cd6924793fbd5f0d637" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "action" ADD CONSTRAINT "FK_38c87a05b89d8cb2658d0542c92" FOREIGN KEY ("answerId") REFERENCES "answer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subject_questionnaire" ADD CONSTRAINT "FK_31466819f11ff9f59ff2e6d6b1c" FOREIGN KEY ("questionnaireId") REFERENCES "questionnaire"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subject_questionnaire" ADD CONSTRAINT "FK_543b3530b77fc9a57e82c17afad" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "subject_questionnaire" DROP CONSTRAINT "FK_543b3530b77fc9a57e82c17afad"`);
        await queryRunner.query(`ALTER TABLE "subject_questionnaire" DROP CONSTRAINT "FK_31466819f11ff9f59ff2e6d6b1c"`);
        await queryRunner.query(`ALTER TABLE "action" DROP CONSTRAINT "FK_38c87a05b89d8cb2658d0542c92"`);
        await queryRunner.query(`ALTER TABLE "answer" DROP CONSTRAINT "FK_a4013f10cd6924793fbd5f0d637"`);
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_e924e3b8137111256e04c8f7500"`);
        await queryRunner.query(`ALTER TABLE "subject" DROP CONSTRAINT "FK_49ad15d1508f20fe87e7de202f6"`);
        await queryRunner.query(`ALTER TABLE "subject" DROP CONSTRAINT "FK_db3e4bb8d8ac44b96644c674cbb"`);
        await queryRunner.query(`ALTER TABLE "questionnaire" DROP CONSTRAINT "FK_1b9c8d4e96b2336dd556d31eaf9"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_058c8088c47775238167dce33f4"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_c41a1d36702f2cd0403ce58d33a"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_64a4f1809ccb037b28a730153b8"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_9bdc025ccd3babaddf068d7ad06"`);
        await queryRunner.query(`ALTER TABLE "questionnaire_instance" DROP CONSTRAINT "FK_b4556383106c1116778b7efeac8"`);
        await queryRunner.query(`ALTER TABLE "questionnaire_instance" DROP CONSTRAINT "FK_3f8992ceb610660336883b636b7"`);
        await queryRunner.query(`ALTER TABLE "response" DROP CONSTRAINT "FK_dfd952a4d26cf661248efec5f37"`);
        await queryRunner.query(`ALTER TABLE "response" DROP CONSTRAINT "FK_5b7e5db20fea12359657949f419"`);
        await queryRunner.query(`DROP INDEX "IDX_543b3530b77fc9a57e82c17afa"`);
        await queryRunner.query(`DROP INDEX "IDX_31466819f11ff9f59ff2e6d6b1"`);
        await queryRunner.query(`DROP TABLE "subject_questionnaire"`);
        await queryRunner.query(`DROP TABLE "action"`);
        await queryRunner.query(`DROP TABLE "answer"`);
        await queryRunner.query(`DROP TABLE "question"`);
        await queryRunner.query(`DROP TABLE "subject"`);
        await queryRunner.query(`DROP TABLE "questionnaire"`);
        await queryRunner.query(`DROP TABLE "company_size"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "activity_sector"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "user_role_enum"`);
        await queryRunner.query(`DROP TABLE "questionnaire_instance"`);
        await queryRunner.query(`DROP TABLE "response"`);
        await queryRunner.query(`DROP TABLE "theme"`);
    }

}
