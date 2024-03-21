import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1710802798240 implements MigrationInterface {
    name = 'MyMigration1710802798240'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_fe17c3aeb63da26e833344ee773"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "cardsId" TO "cardId"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "UQ_fe17c3aeb63da26e833344ee773" TO "UQ_501578f69c24fba9ec425535917"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_501578f69c24fba9ec425535917" FOREIGN KEY ("cardId") REFERENCES "cards"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_501578f69c24fba9ec425535917"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "UQ_501578f69c24fba9ec425535917" TO "UQ_fe17c3aeb63da26e833344ee773"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "cardId" TO "cardsId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_fe17c3aeb63da26e833344ee773" FOREIGN KEY ("cardsId") REFERENCES "cards"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
