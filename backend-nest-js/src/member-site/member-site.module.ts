import { Module } from '@nestjs/common';
import { MemberSiteService } from './member-site.service';
import { MemberSiteController } from './member-site.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberCategory } from 'src/member-category/entities/member-category.entity';
import { MemberCategorySite } from './entities/member-category-member-site';
import { MemberSite } from './entities/member-site.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([MemberSite, MemberCategory, MemberCategorySite, ]), HttpModule],
  controllers: [MemberSiteController],
  providers: [MemberSiteService],
})
export class MemberSiteModule {}
