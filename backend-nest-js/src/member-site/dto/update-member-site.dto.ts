import { PartialType } from '@nestjs/swagger';
import { CreateMemberSiteDto } from './create-member-site.dto';
import { MemberCategory } from 'src/member-category/entities/member-category.entity';

export class UpdateMemberSiteDto extends PartialType(CreateMemberSiteDto) {
    MemberSiteId : string;
    Categories : MemberCategory[];
}
