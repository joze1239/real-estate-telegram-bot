import {MigrationInterface, QueryRunner} from "typeorm";

export class PageView1637361424682 implements MigrationInterface {
    name = 'PageView1637361424682'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "page_view" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "chat_id" numeric NOT NULL, "url" character varying(512) NOT NULL, CONSTRAINT "PK_b01ec2dc6dc377f811d4db5613e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "page_view"`);
    }

}
