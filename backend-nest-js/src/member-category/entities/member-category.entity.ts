import { Site } from 'src/site/entities/site.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
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

  // @ManyToMany((type) => Site) //, (category) => category.CategoryId
  // @JoinTable({
  //   name: 'TA_ReCategorySite',
  //   joinColumn: {
  //     name: 'CategoryId',
  //     referencedColumnName: 'CategoryId',
  //   },
  //   inverseJoinColumn: {
  //     name: 'SiteId',
  //     referencedColumnName: 'SiteId', //타겟 테이블의 id값
  //   },
  // })
  // Sites: Site[];
}
