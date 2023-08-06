import { Entity, Column } from 'typeorm';

import { BaseEntity } from '../entity/base.entity';

@Entity('companies')
export class Company extends BaseEntity {
  @Column()
  name: string;

  @Column('integer', { name: 'yc_id' })
  ycId: number;
}
