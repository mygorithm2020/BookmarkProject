import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity({name : 'TA_Authentication'})
export class Authentication {

    @PrimaryColumn()
    AuthId : number;

    @Column()
    Email : string;

    @Column()
    PhoneCode : string;

    @Column()
    PhoneNo : string;

    @Column()
    AuthCode : string;

    @Column()
    IsAuth  : number;

    @Column()
    CreateDate : Date;

    @Column()
    UpdateDate : Date;
}