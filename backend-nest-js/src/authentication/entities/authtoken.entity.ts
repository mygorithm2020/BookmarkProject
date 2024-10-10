import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'TA_AuthToken' })
export class AuthToken {
  @PrimaryColumn()
  TokenId: number;

  @Column()
  Token: string;

  @Column()
  MemberId: string;

  @Column()
  IP: string;

  @Column()
  UserAgent: string;

  @Column()
  Origin: string;

  @Column()
  CreateDate: Date;
}
