import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1713970110391 implements MigrationInterface {
    name = 'MyMigration1713970110391'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transferTo" ("id" SERIAL NOT NULL, "toPanCard" character varying NOT NULL, "message" character varying NOT NULL, "dateTransfer" TIMESTAMP NOT NULL DEFAULT now(), "accountId" integer, CONSTRAINT "PK_ee9271cb417aa760a8f5ae872ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transferFrom" ("id" SERIAL NOT NULL, "typeTransfer" character varying NOT NULL, "fromPanCard" character varying NOT NULL, "amount" integer NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "transferToId" integer, "accountId" integer, CONSTRAINT "REL_1f5a73877408effc89e72b9b42" UNIQUE ("transferToId"), CONSTRAINT "PK_b746ac2c060923168ebf36f7815" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transferTo" ADD CONSTRAINT "FK_016a2e8366647629f36abe3048c" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transferFrom" ADD CONSTRAINT "FK_1f5a73877408effc89e72b9b420" FOREIGN KEY ("transferToId") REFERENCES "transferTo"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "transferFrom" ADD CONSTRAINT "FK_f16e37ca91320090249fe39b287" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transferFrom" DROP CONSTRAINT "FK_f16e37ca91320090249fe39b287"`);
        await queryRunner.query(`ALTER TABLE "transferFrom" DROP CONSTRAINT "FK_1f5a73877408effc89e72b9b420"`);
        await queryRunner.query(`ALTER TABLE "transferTo" DROP CONSTRAINT "FK_016a2e8366647629f36abe3048c"`);
        await queryRunner.query(`DROP TABLE "transferFrom"`);
        await queryRunner.query(`DROP TABLE "transferTo"`);
    }

}
