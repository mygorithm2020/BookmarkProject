// 테이블 공통 칼럼 정의용

import { Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class Content {
    
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