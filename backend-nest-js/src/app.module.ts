import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './test/test.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { SitesModule } from './sites/sites.module';
import { CategoryModule } from './category/category.module';
import { Book }  from './books/entities/book.entity';
import { Category } from './category/entities/category.entity';

@Module({
  imports: [ TestModule, BooksModule, SitesModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
