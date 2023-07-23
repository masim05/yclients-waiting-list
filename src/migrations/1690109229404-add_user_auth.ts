import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserAuth1690109229404 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE public."users" ADD CONSTRAINT users_email_uq UNIQUE (email);`,
    );
    await queryRunner.query(
      `ALTER TABLE public."users" ADD CONSTRAINT users_username_uq UNIQUE (username);`,
    );
    await queryRunner.query(
      `ALTER TABLE public."users" ADD COLUMN password TEXT NOT NULL;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE public."users" DROP CONSTRAINT users_email_uq;`,
    );

    await queryRunner.query(
      `ALTER TABLE public."users" DROP CONSTRAINT users_username_uq;`,
    );
    await queryRunner.query(`ALTER TABLE public."users" DROP COLUMN password;`);
  }
}
