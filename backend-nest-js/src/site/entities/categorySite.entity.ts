import { Category } from 'src/category/entities/category.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Site } from './site.entity';

@Entity({ name: 'TA_ReCategorySite' })
export class CategorySite {
  @PrimaryColumn()
  Id: number;

  @Column()
  CategoryId: string;

  @Column()
  SiteId: string;

  @Column()
  CreatedDate: Date;

  @ManyToOne((type) => Category, (category) => category.CategoryId)
  @JoinColumn({ name: 'CategoryId', referencedColumnName: 'CategoryId' })
  categories: Category;

  @ManyToOne((type) => Site, (site) => site.SiteId)
  @JoinColumn({ name: 'SiteId', referencedColumnName: 'SiteId' })
  sites: Site;
}
