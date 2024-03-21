import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1710798667704 implements MigrationInterface {
    name = 'MyMigration1710798667704'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "fullName" character varying NOT NULL, "username" character varying NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "update" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cards" ("id" SERIAL NOT NULL, "status" integer NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5f3269634705fdff4a9935860fc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "location" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "activity" ("id" SERIAL NOT NULL, "status" character varying NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "createAt" TIMESTAMP NOT NULL DEFAULT now(), "cardId" integer, "locationId" integer, CONSTRAINT "PK_24625a1d6b1b089c8ae206fe467" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "activity" ADD CONSTRAINT "FK_dd917e47b2d506dc4659ae3830b" FOREIGN KEY ("cardId") REFERENCES "cards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "activity" ADD CONSTRAINT "FK_7bd49b3b937cda5b9921a44a959" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activity" DROP CONSTRAINT "FK_7bd49b3b937cda5b9921a44a959"`);
        await queryRunner.query(`ALTER TABLE "activity" DROP CONSTRAINT "FK_dd917e47b2d506dc4659ae3830b"`);
        await queryRunner.query(`DROP TABLE "activity"`);
        await queryRunner.query(`DROP TABLE "location"`);
        await queryRunner.query(`DROP TABLE "cards"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
