import { PartialType } from '@nestjs/swagger';
import { CreateMemberCategoryDto } from './create-member-category.dto';
import { MemberSite } from 'src/member-site/entities/member-site.entity';

export class UpdateMemberCategoryDto extends PartialType(CreateMemberCategoryDto) {

    MemberCategoryId: string;    

    Sites: MemberSite[];
}
