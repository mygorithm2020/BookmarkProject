import { MemberBookmark } from 'src/member-bookmark/entities/member-bookmark.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity({ name: 'TA_Member' })
export class Member {
  @PrimaryColumn()
  MemberId: string;

  @Column()
  Password: string;

  @Column()
  MemEmail: string;

  @Column()
  NickName: string;

  @Column()
  Birth: string; // 생년월일 8자리

  @Column()
  Gender: string;

  @Column()
  Authentication: number; // "0 이면 최초단계 1이면 승인 2이면 차단된 계정"

  // @Column()
  // AuthenticationCode : string;

  @Column()
  Authorization: number; // "일반, 개인 : 1, 회사계정 : 2, .."

  @Column()
  IsDeleted: number;

  @Column()
  CreateDate: Date;

  @Column()
  UpdateDate: Date;

  @OneToMany(
    (type) => MemberBookmark,
    (memberBookmark) => memberBookmark.MemberId,
  )
  memberBookmarks: MemberBookmark[];
}
