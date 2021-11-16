import {MigrationInterface, QueryRunner} from "typeorm";

export class SubscriptionName1637093111594 implements MigrationInterface {
    name = 'SubscriptionName1637093111594'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscription" ADD "name" character varying(64) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscription" DROP COLUMN "name"`);
    }

}
