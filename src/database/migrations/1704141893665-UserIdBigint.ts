import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserIdBigint1704141893665 implements MigrationInterface {
  name = 'UserIdBigint1704141893665';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "external_id" TYPE BIGINT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "external_id" TYPE integer`,
    );
  }
}
