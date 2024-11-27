import { PartialType } from '@nestjs/swagger';
import { CreateMemberCategoryDto } from './create-member-category.dto';

export class UpdateMemberCategoryDto extends PartialType(CreateMemberCategoryDto) {}
