import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity({name : 'TA_Member'})
export class Member {

    @PrimaryColumn()
    MemberId : string;

    @Column()
    password : string;

    @Column()
    MemEmail : string;

    @Column()
    NickName : string;

    @Column()
    Birth  : string;

    @Column()
    Gender  : string;

    @Column()
    Authorization : number; // "일반, 개인 : 1, 회사계정 : 2, .."

    @Column()
    IsDeleted : number;

    @Column()
    CreateDate : Date;

    @Column()
    UpdateDate : Date;
}