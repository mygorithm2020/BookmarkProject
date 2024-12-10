import { MemberCategory } from 'src/member-category/entities/member-category.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { MemberSite } from './member-site.entity';

@Entity({ name: 'TA_ReMemberCategoryMemberSite' })
export class MemberCategorySite {
  @PrimaryColumn()
  Id: number;

  @Column()
  MemberCategoryId: string;

  @Column()
  MemberSiteId: string;

  @Column()
  CreatedDate: Date;

  @ManyToOne(() => MemberCategory, (category) => category.Sites)
  @JoinColumn({ name: 'MemberCategoryId', referencedColumnName: 'MemberCategoryId' })
  Category: MemberCategory;

  // @ManyToOne(() => MemberSite, (site) => site.Categories)
  // @JoinColumn({ name: 'MemberSiteId', referencedColumnName: 'MemberSiteId' })
  // Site: MemberSite;
}
