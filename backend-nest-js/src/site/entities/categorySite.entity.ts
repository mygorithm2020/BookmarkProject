import { ApiBody, ApiProperty } from "@nestjs/swagger";
import { Content } from "src/app.entity";
import { Category } from "src/category/entities/category.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Site } from "./site.entity";

@Entity({name : "TA_ReCategorySite"})
export class CategorySite {

    @PrimaryColumn()
    Id: number;
    
    @Column()
    CategoryId : string;

    @Column()
    SiteId : string;

    @Column()
    CreatedDate : Date;

    @ManyToOne(() => Category, (category) => category.CategoryId)
    @JoinColumn({ name: 'CategoryId', referencedColumnName: 'CategoryId' })
    categories: Category;

    @ManyToOne(() => Site, (site) => site.SiteId)
    @JoinColumn({ name: 'SiteId', referencedColumnName: 'SiteId' })
    sites: Site;
}