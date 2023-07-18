import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsers1689701088822 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE public."users" (
            uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
            "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
            "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
            username character varying NOT NULL,
            email character varying NOT NULL
        );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users";`);
  }
}
