import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("member")
@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post("signup")
  async create(@Body() createMemberDto: CreateMemberDto) {
    let res = await this.memberService.create(createMemberDto);
    return {MemEmail : res.MemEmail}
  }

  @Post("/login")
  login(@Body() createMemberDto: Member) {
    let sessiondId = this.memberService.loginWithEmailPw(createMemberDto.MemEmail, createMemberDto.password);
    return {SessiondId : sessiondId};
  }

  @Get()
  findAll() {
    let res = this.memberService.findAll();
    res.then((r) => {
      console.log(r);
    })
    return res;
  }

  @Get("/email")
  findOnebyEmail(
    @Query("email") email : string){
    let result = this.memberService.findOneByEmail(email);
    return result;
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
