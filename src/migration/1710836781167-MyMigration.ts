import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1710836781167 implements MigrationInterface {
    name = 'MyMigration1710836781167'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cards" ADD "numberCard" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cards" ALTER COLUMN "status" SET DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cards" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "cards" DROP COLUMN "numberCard"`);
    }

}
