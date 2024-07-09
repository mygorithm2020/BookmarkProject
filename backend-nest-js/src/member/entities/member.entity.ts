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
    Authentication : number; // "0 이면 미승인 1이면 승인 2이면 차단된 계정"

    @Column()
    AuthenticationCode : string;

    @Column()
    Authorization : number; // "일반, 개인 : 1, 회사계정 : 2, .."

    @Column()
    IsDeleted : number;

    @Column()
    CreateDate : Date;

    @Column()
    UpdateDate : Date;
}