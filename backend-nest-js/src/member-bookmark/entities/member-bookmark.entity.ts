import { Member } from 'src/member/entities/member.entity';
import { ICustomEntity } from 'src/publicComponents/iCustomEntity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'TA_MemberBookmark' })
export class MemberBookmark implements ICustomEntity<MemberBookmark> {
  @PrimaryColumn()
  BookmarkId: string;

  @Column()
  MemberId: string;

  @Column()
  ParentId: string;

  @Column()
  Kind: number; // 1: 폴더, 2: 사이트

  @Column()
  Img: string;

  @Column()
  URL: string;

  @Column()
  PrevId: string;

  @Column()
  NextId: string;

  @Column()
  CreateDate: Date;

  @Column()
  UpdateDate: Date;

  @ManyToOne((type) => Member, (member) => member.memberBookmarks)
  Member: Member;

  constraintEntity(obj: MemberBookmark): void {
    throw new Error('Method not implemented.');
  }
}
