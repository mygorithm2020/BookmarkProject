import { Injectable } from '@nestjs/common';
import { CreateMemberBookmarkDto } from './dto/create-member-bookmark.dto';
import { UpdateMemberBookmarkDto } from './dto/update-member-bookmark.dto';

@Injectable()
export class MemberBookmarkService {
  create(createMemberBookmarkDto: CreateMemberBookmarkDto) {
    return 'This action adds a new memberBookmark';
  }

  findAll() {
    return `This action returns all memberBookmark`;
  }

  findOne(id: number) {
    return `This action returns a #${id} memberBookmark`;
  }

  update(id: number, updateMemberBookmarkDto: UpdateMemberBookmarkDto) {
    return `This action updates a #${id} memberBookmark`;
  }

  remove(id: number) {
    return `This action removes a #${id} memberBookmark`;
  }
}
