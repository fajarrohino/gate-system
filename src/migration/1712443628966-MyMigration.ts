import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1712443628966 implements MigrationInterface {
    name = 'MyMigration1712443628966'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_f6dd45c300e8197ec4db3adbd34"`);
        await queryRunner.query(`ALTER TABLE "accounts" RENAME COLUMN "codeBankId" TO "bankId"`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_284431ab046a654132d200a6b49" FOREIGN KEY ("bankId") REFERENCES "banks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_284431ab046a654132d200a6b49"`);
        await queryRunner.query(`ALTER TABLE "accounts" RENAME COLUMN "bankId" TO "codeBankId"`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_f6dd45c300e8197ec4db3adbd34" FOREIGN KEY ("codeBankId") REFERENCES "banks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
