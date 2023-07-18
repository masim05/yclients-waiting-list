import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsers1689701088822 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('UP');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('DOWN');
  }
}
