import { Injectable } from '@nestjs/common';
import { CreateMemberSiteDto } from './dto/create-member-site.dto';
import { UpdateMemberSiteDto } from './dto/update-member-site.dto';

@Injectable()
export class MemberSiteService {
  create(createMemberSiteDto: CreateMemberSiteDto) {
    return 'This action adds a new memberSite';
  }

  findAll() {
    return `This action returns all memberSite`;
  }

  findOne(id: number) {
    return `This action returns a #${id} memberSite`;
  }

  update(id: number, updateMemberSiteDto: UpdateMemberSiteDto) {
    return `This action updates a #${id} memberSite`;
  }

  remove(id: number) {
    return `This action removes a #${id} memberSite`;
  }
}
