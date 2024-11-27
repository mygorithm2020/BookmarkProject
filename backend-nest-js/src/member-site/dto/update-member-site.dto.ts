import { PartialType } from '@nestjs/swagger';
import { CreateMemberSiteDto } from './create-member-site.dto';

export class UpdateMemberSiteDto extends PartialType(CreateMemberSiteDto) {}
