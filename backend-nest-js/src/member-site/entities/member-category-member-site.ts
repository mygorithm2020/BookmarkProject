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

  @ManyToOne((type) => MemberCategory, (category) => category.MemberCategoryId)
  @JoinColumn({ name: 'MemberCategoryId', referencedColumnName: 'MemberCategoryId' })
  Category: MemberCategory;

  // @ManyToOne((type) => MemberSite, (site) => site.MemberSiteId)
  // @JoinColumn({ name: 'MemberSiteId', referencedColumnName: 'MemberSiteId' })
  // MemSite: MemberSite;
}
