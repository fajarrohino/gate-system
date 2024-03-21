import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1710802470720 implements MigrationInterface {
    name = 'MyMigration1710802470720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "cardsId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_fe17c3aeb63da26e833344ee773" UNIQUE ("cardsId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_fe17c3aeb63da26e833344ee773" FOREIGN KEY ("cardsId") REFERENCES "cards"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_fe17c3aeb63da26e833344ee773"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_fe17c3aeb63da26e833344ee773"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cardsId"`);
    }

}
