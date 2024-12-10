import { Module } from '@nestjs/common';
import { MemberSiteService } from './member-site.service';
import { MemberSiteController } from './member-site.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberCategory } from 'src/member-category/entities/member-category.entity';
import { MemberCategorySite } from './entities/member-category-member-site';
import { MemberSite } from './entities/member-site.entity';
import { HttpModule } from '@nestjs/axios';
import { CustomUtils, FileAdapter } from 'src/publicComponents/utils';
import { Constraint } from 'src/publicComponents/constraint';
import { ApiClient } from 'src/publicComponents/apiClient';

@Module({
  imports: [TypeOrmModule.forFeature([MemberCategorySite, MemberSite, MemberCategory,]), HttpModule],
  controllers: [MemberSiteController],
  providers: [MemberSiteService, CustomUtils, Constraint, ApiClient, FileAdapter],
})
export class MemberSiteModule {}
