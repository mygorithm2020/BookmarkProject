import { Module } from '@nestjs/common';
import { SiteService } from './site.service';
import { SiteController } from './site.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Site } from './entities/site.entity';
import { HttpModule } from '@nestjs/axios';
import { CategorySite } from './entities/categorySite.entity';
import { CustomUtils } from 'src/publicComponents/utils';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/entities/category.entity';

@Module({
  imports : [TypeOrmModule.forFeature([
    Site, CategorySite, Category,
  ]), HttpModule],
  controllers: [SiteController],
  providers: [SiteService, CustomUtils, CategoryService],
})
export class SiteModule {}
