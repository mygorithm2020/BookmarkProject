import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name : 'book'})
export class Book {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    author: string;

    @Column()
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;


    // 커스텀 스키마 확인
    @Column({ length: 50 })
    title: string;

    @Column('text')
    description: string;

    @Column("char", { length : 4})
    countryCode: string;
}
