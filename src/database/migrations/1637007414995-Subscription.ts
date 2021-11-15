import {MigrationInterface, QueryRunner} from "typeorm";

export class Subscription1637007414995 implements MigrationInterface {
    name = 'Subscription1637007414995'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subscription" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "url" character varying(512) NOT NULL, "chat_id" numeric NOT NULL, CONSTRAINT "PK_8c3e00ebd02103caa1174cd5d9d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "subscription"`);
    }

}
