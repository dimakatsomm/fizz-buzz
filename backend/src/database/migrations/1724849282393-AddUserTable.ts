import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserTable1724849282393 implements MigrationInterface {
    name = 'AddUserTable1724849282393'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "surname" character varying, "email" character varying, "deleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
