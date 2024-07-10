import { Module } from '@nestjs/common';
import { SiteService } from './site.service';
import { SiteController } from './site.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Site } from './entities/site.entity';
import { HttpModule } from '@nestjs/axios';
import { CategorySite } from './entities/categorySite.entity';
import { CustomUtils } from 'src/publicComponents/utils';

@Module({
  imports : [TypeOrmModule.forFeature([
    Site, CategorySite
  ]), HttpModule],
  controllers: [SiteController],
  providers: [SiteService, CustomUtils],
})
export class SiteModule {}
