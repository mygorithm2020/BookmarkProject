import { Module } from '@nestjs/common';
import { MemberCategoryService } from './member-category.service';
import { MemberCategoryController } from './member-category.controller';

@Module({
  controllers: [MemberCategoryController],
  providers: [MemberCategoryService],
})
export class MemberCategoryModule {}
