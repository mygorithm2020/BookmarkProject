import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MemberBookmarkService } from './member-bookmark.service';
import { CreateMemberBookmarkDto } from './dto/create-member-bookmark.dto';
import { UpdateMemberBookmarkDto } from './dto/update-member-bookmark.dto';

@Controller('member-bookmark')
export class MemberBookmarkController {
  constructor(private readonly memberBookmarkService: MemberBookmarkService) {}

  @Post()
  create(@Body() createMemberBookmarkDto: CreateMemberBookmarkDto) {
    return this.memberBookmarkService.create(createMemberBookmarkDto);
  }

  @Get()
  findAll() {
    return this.memberBookmarkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memberBookmarkService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMemberBookmarkDto: UpdateMemberBookmarkDto,
  ) {
    return this.memberBookmarkService.update(+id, updateMemberBookmarkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memberBookmarkService.remove(+id);
  }
}
