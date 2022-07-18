import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserColumnsNullable1658178959200 implements MigrationInterface {
  name = 'UserColumnsNullable1658178959200';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "first_name" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "last_name" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "last_name" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "first_name" SET NOT NULL`,
    );
  }
}
