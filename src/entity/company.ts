import { Entity, Column } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity('companies')
export class Company extends BaseEntity {
  @Column()
  name: string;

  @Column()
  yc_id: number;
}
