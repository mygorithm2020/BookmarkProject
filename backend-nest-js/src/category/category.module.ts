import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CustomUtils, FileAdapter } from 'src/publicComponents/utils';
import { Constraint } from 'src/publicComponents/constraint';
import { ApiClient } from 'src/publicComponents/apiClient';

@Module({
  imports : [TypeOrmModule.forFeature([
    Category
  ])],
  controllers: [CategoryController],
  providers: [CategoryService, CustomUtils, Constraint, ApiClient, FileAdapter],
})
export class CategoryModule {}
