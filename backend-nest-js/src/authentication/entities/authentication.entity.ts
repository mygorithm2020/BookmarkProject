import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'TA_Authentication' })
export class Authentication {
  @PrimaryColumn()
  AuthId: number;

  @Column()
  Email: string;

  @Column()
  PhoneCode: string;

  @Column()
  PhoneNo: string;

  @Column()
  AuthCode: string;

  @Column()
  Count: number;

  @Column()
  IsAuth: number;

  @Column()
  CreateDate: Date;

  @Column()
  UpdateDate: Date;
}
