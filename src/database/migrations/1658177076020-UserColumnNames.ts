import {MigrationInterface, QueryRunner} from "typeorm";

export class UserColumnNames1658177076020 implements MigrationInterface {
    name = 'UserColumnNames1658177076020'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "first_name" character varying(64) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "last_name" character varying(64) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "first_name"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastName" character varying(64) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "firstName" character varying(64) NOT NULL`);
    }

}
