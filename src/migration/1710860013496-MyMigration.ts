import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1710860013496 implements MigrationInterface {
    name = 'MyMigration1710860013496'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "activity" ADD "gate" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "activity" ADD "status" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "activity" ADD "date" date NOT NULL DEFAULT ('now'::text)::date`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "activity" ADD "date" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "activity" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "gate"`);
        await queryRunner.query(`ALTER TABLE "activity" ADD "createAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
