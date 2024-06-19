import { ApiBody, ApiProperty } from "@nestjs/swagger";
import { Content } from "src/app.entity";
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity({name : "TA_Site"})
export class Site {

    @ApiProperty()
    @PrimaryColumn({
        type: "char",
        length : 32,
    })
    SiteId : string;

    @ApiProperty({required : true})
    @Column({
        type: "varchar",
        length : 511,
        unique : true
    })
    URL : string;

    @ApiProperty()
    @Column({
        type: "varchar",
        length : 255,
        nullable : true
    })
    Name : string;

    @ApiProperty()
    @Column({
        type: "varchar",
        length : 255,
        nullable : true
        
    })
    NameKR : string;    

    @ApiProperty()
    @Column({
        type: "varchar",
        length : 63,
        nullable : true
    })
    IPAddress : string;

    @ApiProperty()
    @Column({
        type: "varchar",
        length : 511,
        nullable : true
    })
    LogoImg : string;

    @ApiProperty()
    @Column({
        type: "varchar",
        length : 511,
        nullable : true
    })
    AppLinkAndroid : string;

    @ApiProperty()
    @Column({
        type: "varchar",
        length : 511,
        nullable : true
    })
    AppLinkIOS : string;


    @ApiProperty()
    @Column({
        type: "varchar",
        length : 255,
        nullable : true
    })
    Title : string;

    @ApiProperty()
    @Column({
        type: "varchar",
        length : 511,
        nullable : true
    })
    FaviconImg: string;

    @ApiProperty()
    @Column({
        type: "varchar",
        length : 1023,
        nullable : true
    })
    Description : string;

    @ApiProperty()
    @Column({
        type: "varchar",
        length : 255,
        nullable : true
    })
    Keywords : string;

    @ApiProperty()
    @Column({
        type: "varchar",
        length : 255,
        nullable : true
    })
    OGTitle : string;

    @ApiProperty()
    @Column({
        type: "varchar",
        length : 255,
        nullable : true
    })
    OGSiteName: string;
    @Column({
        type: "varchar",
        length : 511,
        nullable : true
    })
    OGImg : string;
    @Column({
        type: "varchar",
        length : 1023,
        nullable : true
    })
    OGDescription: string;
    @Column({
        type: "varchar",
        length : 511,
        nullable : true
    })
    OGURL : string;



    @Column({
        type: "bigint",
        default : 0
    })
    Views : number;
    @Column({
        type : "bigint",
        default : 0
    })
    Like : number;
    @Column({
        type: "bigint",
        default : 0
    })
    Dislike : number;
    @Column({
        type: "varchar",
        length : 127,
        nullable : true
    })
    Admin : string;
    @Column({
        type: "varchar",
        length : 127,
        nullable : true
    })
    Email : string;

    @Column({
        type : "int",
        nullable : true,
        default : 1
    })
    Status : number;
        
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
