import { MigrationInterface, QueryRunner } from "typeorm";

export class MasterSchema1767455009385 implements MigrationInterface {
    name = 'MasterSchema1767455009385'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subject" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_12eee115462e38d62e5455fc054" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ngos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "address" character varying, "phoneNumber" character varying, CONSTRAINT "UQ_6d8beb925fe6944099f0faf104b" UNIQUE ("email"), CONSTRAINT "PK_f64f509c60499b255fd259a4973" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "assessments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "category" character varying NOT NULL, "respondent" character varying NOT NULL, "answers" json NOT NULL, "childId" uuid, CONSTRAINT "PK_a3442bd80a00e9111cefca57f6c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "child" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "yob" integer NOT NULL, "ngoId" uuid, CONSTRAINT "PK_4609b9b323ca37c6bc435ec4b6b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "option" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" character varying NOT NULL, "weight" integer NOT NULL, "questionId" uuid, CONSTRAINT "PK_e6090c1c6ad8962eea97abdbe63" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "question" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" character varying NOT NULL, "intelligenceId" uuid, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "intelligence" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_22e53c507048f80db65ab155b2e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "student_score" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "score" integer NOT NULL DEFAULT '50', "childId" uuid, "intelligenceId" uuid, CONSTRAINT "PK_827cb6a3eea6fe7f8eb02260ad8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "student_response" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "childId" uuid, "questionId" uuid, "selectedOptionId" uuid, CONSTRAINT "PK_5a9bf9b4a673aa554a565297800" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "person" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "phone" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'volunteer', CONSTRAINT "UQ_ed9d5dea665e5d266ed2c592def" UNIQUE ("phone"), CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "activity" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_24625a1d6b1b089c8ae206fe467" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "assessments" ADD CONSTRAINT "FK_51280f3a3980dfae34bce293bd9" FOREIGN KEY ("childId") REFERENCES "child"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "child" ADD CONSTRAINT "FK_59d2c1f63edbbd05eb0e67fb978" FOREIGN KEY ("ngoId") REFERENCES "ngos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "option" ADD CONSTRAINT "FK_b94517ccffa9c97ebb8eddfcae3" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_032bb98ce0ef6f75b17097cdb26" FOREIGN KEY ("intelligenceId") REFERENCES "intelligence"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_score" ADD CONSTRAINT "FK_c7ca7204e8799baf0e4e7bab8b1" FOREIGN KEY ("childId") REFERENCES "child"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_score" ADD CONSTRAINT "FK_dc8ae89b82b21f7810598792aeb" FOREIGN KEY ("intelligenceId") REFERENCES "intelligence"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_response" ADD CONSTRAINT "FK_d71fc26abfab184f263d70a35e7" FOREIGN KEY ("childId") REFERENCES "child"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_response" ADD CONSTRAINT "FK_02a48d5c710307db31c8dab17c8" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_response" ADD CONSTRAINT "FK_d3b8fc32243a316afdfc044de95" FOREIGN KEY ("selectedOptionId") REFERENCES "option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student_response" DROP CONSTRAINT "FK_d3b8fc32243a316afdfc044de95"`);
        await queryRunner.query(`ALTER TABLE "student_response" DROP CONSTRAINT "FK_02a48d5c710307db31c8dab17c8"`);
        await queryRunner.query(`ALTER TABLE "student_response" DROP CONSTRAINT "FK_d71fc26abfab184f263d70a35e7"`);
        await queryRunner.query(`ALTER TABLE "student_score" DROP CONSTRAINT "FK_dc8ae89b82b21f7810598792aeb"`);
        await queryRunner.query(`ALTER TABLE "student_score" DROP CONSTRAINT "FK_c7ca7204e8799baf0e4e7bab8b1"`);
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_032bb98ce0ef6f75b17097cdb26"`);
        await queryRunner.query(`ALTER TABLE "option" DROP CONSTRAINT "FK_b94517ccffa9c97ebb8eddfcae3"`);
        await queryRunner.query(`ALTER TABLE "child" DROP CONSTRAINT "FK_59d2c1f63edbbd05eb0e67fb978"`);
        await queryRunner.query(`ALTER TABLE "assessments" DROP CONSTRAINT "FK_51280f3a3980dfae34bce293bd9"`);
        await queryRunner.query(`DROP TABLE "activity"`);
        await queryRunner.query(`DROP TABLE "person"`);
        await queryRunner.query(`DROP TABLE "student_response"`);
        await queryRunner.query(`DROP TABLE "student_score"`);
        await queryRunner.query(`DROP TABLE "intelligence"`);
        await queryRunner.query(`DROP TABLE "question"`);
        await queryRunner.query(`DROP TABLE "option"`);
        await queryRunner.query(`DROP TABLE "child"`);
        await queryRunner.query(`DROP TABLE "assessments"`);
        await queryRunner.query(`DROP TABLE "ngos"`);
        await queryRunner.query(`DROP TABLE "subject"`);
    }

}
