import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

// 단방향 매핑(user 테이블에 productId 가 FK로 생성)

// @Entity()
// export class Product {
//     @PrimaryGeneratedColumn()
//     id: number;

//         // ...
// }

// @Entity()
// export class User {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column()
//     name: string;

//         // ...

//     @OneToOne(() => Product)
//     @JoinColumn()
//     product: Product;
// }

// 연관 관계 저장 방법

// const product = new Product();
// product.name = '컴퓨터';
// product.price = 10000;
// product.description = '맥북 프로';
// product.isUpdated = false;
// await this.productsRepository.save(product);

// const user = new User();
// user.name = '고현수';
// user.product = product;
// await this.usersRepository.save(user);