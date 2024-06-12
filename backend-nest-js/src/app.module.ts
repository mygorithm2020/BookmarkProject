import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './test/test.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { CategoryModule } from './category/category.module';
import { Book }  from './books/entities/book.entity';
import { Category } from './category/entities/category.entity';
import { ConfigModule } from '@nestjs/config';
import { SiteModule } from './site/site.module';
import * as dotenv from "dotenv";
import { DataSource } from 'typeorm';

dotenv.config();

console.log(process.env.DB_HOST);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal : true,
    }),
    TypeOrmModule.forRoot({
    type: 'mysql',
    host : 'localhost',
    port : 3306,
    username : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    entities : [Book, Category],
    database : process.env.DB_DATABASE,
    synchronize : false
  }), TestModule, BooksModule, CategoryModule, SiteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
