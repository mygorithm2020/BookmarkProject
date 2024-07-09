import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("member")
@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  create(@Body() createMemberDto: Member) {
    return this.memberService.create(createMemberDto);
  }

  @Post("/login")
  login(@Body() createMemberDto: Member) {
    return this.memberService.loginWithEmailPw(createMemberDto.MemEmail, createMemberDto.password);
  }

  @Get()
  findAll() {
    let res = this.memberService.findAll();
    res.then((r) => {
      console.log(r);
    })
    return res;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memberService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemberDto: Member) {
    return this.memberService.update(id, updateMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memberService.remove(id);
  }
}
