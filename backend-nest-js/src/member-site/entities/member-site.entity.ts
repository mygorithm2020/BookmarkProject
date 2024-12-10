import { MemberCategory } from "src/member-category/entities/member-category.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";
import { MemberCategorySite } from "./member-category-member-site";

@Entity({ name: 'TA_MemberSite' })
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
    CreateDate: Date;

    // @OneToMany(() => MemberCategorySite, (memCaSi) => memCaSi.Site)
    // Categories: MemberCategory[];

    // @ManyToMany(() => MemberCategory) //, (category) => category.CategoryId
    // @JoinTable({
    //     name: 'TA_ReMemberCategoryMemberSite',
    //     joinColumn: {
    //     name: 'MemberSiteId',
    //     referencedColumnName: 'MemberSiteId', //타겟 테이블의 id값
    //     },
    //     inverseJoinColumn: {
    //     name: 'MemberCategoryId',
    //     referencedColumnName: 'MemberCategoryId',
    //     },
    // })
    // Categories: MemberCategory[];
}
