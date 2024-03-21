import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1710802946388 implements MigrationInterface {
    name = 'MyMigration1710802946388'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_501578f69c24fba9ec425535917"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_501578f69c24fba9ec425535917"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cardId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "cardId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_501578f69c24fba9ec425535917" UNIQUE ("cardId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_501578f69c24fba9ec425535917" FOREIGN KEY ("cardId") REFERENCES "cards"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
