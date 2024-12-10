import { MemberCategorySite } from 'src/member-site/entities/member-category-member-site';
import { MemberSite } from 'src/member-site/entities/member-site.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'TA_MemberCategory' })
export class MemberCategory {
    @PrimaryColumn({
      type: 'char',
      length: 32,
      unique: true,
    })
    MemberCategoryId: string;

    @Column()
    MemberId: string;

    @Column()
    Name: string;

    @Column()
    Sequence: number;

    @CreateDateColumn({
      type: 'datetime',
    })
    CreatedDate: Date;

    @OneToMany(() => MemberCategorySite, (memCaSi) => memCaSi.Category)
    Sites: MemberSite[];

    // @ManyToMany(() => MemberSite) //, (category) => category.CategoryId
    // @JoinTable({
    //   name: 'TA_ReMemberCategoryMemberSite',
    //   joinColumn: {
    //     name: 'MemberCategoryId',
    //     referencedColumnName: 'MemberCategoryId',
    //   },
    //   inverseJoinColumn: {
    //     name: 'MemberSiteId',
    //     referencedColumnName: 'MemberSiteId', //타겟 테이블의 id값
    //   },
    // })
    // Sites: MemberSite[];
}
