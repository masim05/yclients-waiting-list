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
            );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "companies";`);
  }
}
