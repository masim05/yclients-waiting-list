import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCompanies1689785774653 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE public.companies (
                uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
                "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
                "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
                name character varying NOT NULL,
                yc_id integer NOT NULL
            );
      ALTER TABLE "companies" ADD CONSTRAINT "PK_3fa0b2af99d910864a56bb10c9e" PRIMARY KEY ("uuid");`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "companies";`);
  }
}
