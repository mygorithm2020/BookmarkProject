import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

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

}
