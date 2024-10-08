import { ApiProperty } from "@nestjs/swagger";
import { CustomUtils } from "src/publicComponents/utils";
import { CategorySite } from "src/site/entities/categorySite.entity";
import { Site } from "src/site/entities/site.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity({name : 'TA_Category'})
export class Category {

    @PrimaryColumn({
        type : "char",
        length : 32,
        unique : true
    })    
    CategoryId : string;

    @Column({
        type : "char",
        nullable : true,
        length : 32
    })
    ParentId : string;

    @Column({
        type : "int",
        default : 1
    })
    Layer : number;

    @Column({
        type : "nvarchar",
        length : 63
    })
    Name : string;

    @Column({
        type : "nvarchar",
        length : 63
    })
    NameKR : string;

    @Column({
        type : "int",
        nullable : true,
        default : 1
    })
    Status : number;

    @Column()
    Sequence : number;

    @Column()
    Views : number;

    @Column({
        type : "smallint",
        nullable : false,
        default : 0
    })    
    IsDeleted : number;

    @CreateDateColumn({
        type : "datetime"
    })
    CreatedDate : Date;

    @UpdateDateColumn()
    UpdatedDate : Date;

    @ManyToMany(type => Site) //, (category) => category.CategoryId
    @JoinTable({
        name : "TA_ReCategorySite",
        joinColumn : {
            name : "CategoryId",
            referencedColumnName : "CategoryId" 
        },
        inverseJoinColumn : {
            name : "SiteId",
            referencedColumnName : "SiteId"   //타겟 테이블의 id값
        },        
    })
    Sites: Site[]

}