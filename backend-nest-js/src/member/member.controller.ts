import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req, HttpException, HttpStatus } from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { AuthGuard } from 'src/middleware/auth.guard';
import { Request } from 'express';

@ApiTags("member")
@Controller('member')
// @UseGuards(AuthGuard)
export class MemberController {
  constructor(private readonly memberService: MemberService,
    private readonly authService: AuthenticationService
  ){}

  @Post("/signup")
  async create(@Body() createMemberDto: CreateMemberDto) {

    let result = null;
    
    const authRecord = await this.authService.findByEmailAdmin(createMemberDto.MemEmail);    
    if (!authRecord || authRecord.length == 0){
      throw new HttpException({
        errCode : 11,
        error : "not exist auth request record, please complete email authentication first"
      }, HttpStatus.BAD_REQUEST);
    }

    // 인증여부 확인, 10시간 이내에 인증 기록이 있는가
    if (authRecord[0].IsAuth == 1 && (new Date().getTime() - authRecord[0].UpdateDate.getTime() < 36000000)){
      const mem = await this.memberService.createPublic(createMemberDto);
      if (mem && mem.MemberId){
        result = {MemEmail : mem.MemEmail};
      }
    } else {
      throw new HttpException({
        errCode : 12,
        error : "authentication is not checked yet, please complete first"
      }, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @Post("/login")
  async signIn(@Body() createMemberDto: Member, @Req() req : Request) {
    // 기존 토큰이 있다면 그대로 리턴해주면 그만 아닐까.....

    let result = await this.memberService.signInWithEmailPw(createMemberDto.MemEmail, createMemberDto.Password, req.ip, req.headers['user-agent'], req.headers.origin);
    if (result.accessToken && result.refreshToken){
      console.log(result);
    }
    return result;
  }

  // 토큰 리프레쉬

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
      email = decodeURIComponent(email);

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

  @Patch('/logout')
  logout(@Param('id') id: string, @Body() updateMemberDto: Member) {
    return this.memberService.update(id, updateMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memberService.remove(id);
  }
}
