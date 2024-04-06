import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1712113795401 implements MigrationInterface {
    name = 'MyMigration1712113795401'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "banks" RENAME COLUMN "code" TO "codeId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "banks" RENAME COLUMN "codeId" TO "code"`);
    }

}
