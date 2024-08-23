import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { AuthGuard } from 'src/middleware/auth.guard';

@ApiTags("member")
@Controller('member')
// @UseGuards(AuthGuard)
export class MemberController {
  constructor(private readonly memberService: MemberService,
    private readonly authService: AuthenticationService
  ){}

  @Post()
  async create(@Body() createMemberDto: CreateMemberDto) {

    // 인증여부 확인, 1시간 이내에 인증 기록이 있는가
    const authRecord = await this.authService.findByEmail(createMemberDto.MemEmail);
    let result = null;
    if (authRecord){
      if (authRecord[0].IsAuth == 1 && (new Date().getTime() - authRecord[0].UpdateDate.getTime() < 3600000)){
        const mem = await this.memberService.createPublic(createMemberDto);
        if (mem && mem.MemberId){
          result = {MemEmail : mem.MemEmail};
        }
      }
    }
    return result;
  }

  @Post("/login")
  async signIn(@Body() createMemberDto: Member) {
    let result = await this.memberService.signInWithEmailPw(createMemberDto.MemEmail, createMemberDto.password);
    return result;
  }

  @Get("/admin")
  findAll() {
    let res = this.memberService.findAllAdmin();
    return res;
  }

  // 중복확인
  // 있으면 요청값을 결과 주고
  // 없으면 빈 값 리턴
  @Get("/duplicate")
  async checkDuplicate(
    @Query("email") email : string){
    let result = await this.memberService.findOneByEmailPublic(email);
    if (result && result.MemberId){
      return {email : email};
    }
    return {};
  }


  @Get("/email")
  findOnebyEmail(
    @Query("email") email : string){
    let result = this.memberService.findOneByEmailPublic(email);
    return result;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memberService.findOnePublic(id);
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
