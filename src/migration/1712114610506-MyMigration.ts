import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1712114610506 implements MigrationInterface {
    name = 'MyMigration1712114610506'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "banks" DROP COLUMN "codeId"`);
        await queryRunner.query(`ALTER TABLE "banks" ADD "codeId" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "banks" DROP COLUMN "codeId"`);
        await queryRunner.query(`ALTER TABLE "banks" ADD "codeId" integer NOT NULL`);
    }

}
