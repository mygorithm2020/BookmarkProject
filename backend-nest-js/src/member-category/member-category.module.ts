import { Module } from '@nestjs/common';
import { MemberCategoryService } from './member-category.service';
import { MemberCategoryController } from './member-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberCategory } from './entities/member-category.entity';
import { HttpModule } from '@nestjs/axios';
import { CustomUtils, FileAdapter } from 'src/publicComponents/utils';
import { Constraint } from 'src/publicComponents/constraint';
import { ApiClient } from 'src/publicComponents/apiClient';

@Module({
  imports: [TypeOrmModule.forFeature([MemberCategory]), HttpModule],
  controllers: [MemberCategoryController],
  providers: [MemberCategoryService, CustomUtils, Constraint, ApiClient, FileAdapter],
})
export class MemberCategoryModule {}
