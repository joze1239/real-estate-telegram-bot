import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserExternalId1658176738293 implements MigrationInterface {
  name = 'UserExternalId1658176738293';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "externalId" TO "external_id"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "external_id" TO "externalId"`,
    );
  }
}
