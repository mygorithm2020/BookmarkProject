import { PartialType } from '@nestjs/swagger';
import { CreateMemberBookmarkDto } from './create-member-bookmark.dto';

export class UpdateMemberBookmarkDto extends PartialType(
  CreateMemberBookmarkDto,
) {}
