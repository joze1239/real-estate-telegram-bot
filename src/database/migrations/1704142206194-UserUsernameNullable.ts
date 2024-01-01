import {MigrationInterface, QueryRunner} from "typeorm";

export class UserUsernameNullable1704142206194 implements MigrationInterface {
    name = 'UserUsernameNullable1704142206194'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "username" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "username" SET NOT NULL`);
    }

}
