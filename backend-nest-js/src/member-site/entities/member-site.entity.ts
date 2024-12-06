import { MemberCategory } from "src/member-category/entities/member-category.entity";
import { Column, CreateDateColumn, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";

export class MemberSite {
    @PrimaryColumn({
        type: 'char',
        length: 32,
        unique: true,
    })
    MemberSiteId: string;

    @Column()
    MemberId: string;

    @Column()
    Img: string;

    @Column()
    Name: string;

    @Column()
    URL: string;

    @Column()
    PrevId: string;

    @Column()
    NextId: string;

    @CreateDateColumn({
    type: 'datetime',
    })
    CreatedDate: Date;

    @ManyToMany((type) => MemberCategory) //, (category) => category.CategoryId
    @JoinTable({
        name: 'TA_ReMemberCategoryMemberSite',
        joinColumn: {
        name: 'MemberSiteId',
        referencedColumnName: 'MemberSiteId', //타겟 테이블의 id값
        },
        inverseJoinColumn: {
        name: 'MemberCategoryId',
        referencedColumnName: 'MemberCategoryId',
        },
    })
    Categories: MemberCategory[];
}
