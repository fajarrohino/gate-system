import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1713481151662 implements MigrationInterface {
    name = 'MyMigration1713481151662'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_26d8aec71ae9efbe468043cd2b9"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "fromAccountId"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "toAccountId"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "accountId"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "bank" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "fromPanCard" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "toPanCard" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "message" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "message"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "toPanCard"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "fromPanCard"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "bank"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "accountId" integer`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "toAccountId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "fromAccountId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_26d8aec71ae9efbe468043cd2b9" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
