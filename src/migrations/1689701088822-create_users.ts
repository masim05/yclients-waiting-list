import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsers1689701088822 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE public."users" (
            uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
            created_at timestamp with time zone DEFAULT now() NOT NULL,
            updated_at timestamp with time zone DEFAULT now() NOT NULL,
            username character varying NOT NULL,
            email character varying NOT NULL
        );
        ALTER TABLE "users" ADD CONSTRAINT "PK_951b8f1dfc94ac1d0301a14b7e1" PRIMARY KEY ("uuid")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users";`);
  }
}
