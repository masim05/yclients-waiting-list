import { Entity, Column } from 'typeorm';

import { BaseEntity } from '../entity/base.entity';

@Entity("users")
export class User extends BaseEntity {
  @Column()
  username: string;

  @Column()
  email: string;
}
