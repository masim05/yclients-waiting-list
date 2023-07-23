import { Entity, Column } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity('companies')
// TODO: to move company entity to yclients module
export class Company extends BaseEntity {
  @Column()
  name: string;

  @Column('yc_id')
  ycId: number;
}
