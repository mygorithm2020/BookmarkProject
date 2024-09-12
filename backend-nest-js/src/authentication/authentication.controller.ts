import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, Req } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { Authentication } from './entities/authentication.entity';
import { Member } from 'src/member/entities/member.entity';
import { MemberService } from 'src/member/member.service';
import { Request } from 'express';
import { AuthToken } from './entities/authtoken.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags("auth")
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly memberService: MemberService,
  ) {
    console.log("new AuthenticationController");
  }

  @Post()
  create(@Body() createAuthenticationDto: CreateAuthenticationDto) {
    return this.authService.create(createAuthenticationDto);
  }

  //인증번호 발송
  @Post("/sendemail")
  async sendEmailAuth(
    @Body() auth : Authentication){
      
      let result = {};
      let serviceRes = await this.authService.sendAuthEmail(auth.Email);
      if (serviceRes){
        result = {
          Email : auth.Email
        }

      }
      // let result = this.authService.sendAuthEmail(auth.Email);
      // return {
      //   Email : auth.Email
      // };
      return result;
  }

  @Post("/login")
  async signIn(@Body() memberObj: Member, @Req() req : Request) {
    // 기존 토큰이 있다면 그대로 리턴해주면 그만 아닐까.....
    let result = {};

    // 계정이 존재하는지 확인
    let member = await this.memberService.checkWithEmailPw(memberObj.MemEmail, memberObj.Password);
    
    if (member && member.MemberId){
      // 존재하면 토큰 발급
      let token = await this.authService.createToken(member, req.ip, req.headers['user-agent'], req.headers.origin);
      if (token.AccessToken && token.RefreshToken){
        result = {
          AccessToken : token.AccessToken,
          RefreshToken : token.RefreshToken,
          Member : {
            MemberId : member.MemberId,   
            NickName : member.NickName,            
          }
        }
      }
    }
    return result;
  }

  
  @Get()
  findAll() {
    return this.authService.findAll();
  }

  // 토큰 리프레쉬 + 현재 로그인 상태 확인용
  @Get("/refresh")
  async refreshAccToken(@Req() req : Request) {
    let result = {};
    const [type, tempToken] = req.headers.authorization?.split(' ') ?? [];
    const refreshToken =  type === 'Bearer' ? tempToken : undefined;

    // 리프레쉬 토큰 체크
    const tokenObj = await this.authService.findOneByTokenAdmin(refreshToken);
    if (!tokenObj || !tokenObj.Token || tokenObj.IP !== req.ip || tokenObj.UserAgent !== req.headers['user-agent'] || tokenObj.Origin != req.headers.origin){
      throw new HttpException({
        errCode : 11,
        error : "wrong token"
      }, HttpStatus.BAD_REQUEST);
    }

    // 리프레시 토큰에 있는 멤버 정보로 멤버 조회
    const member = await this.memberService.findOnePublic(tokenObj.MemberId);
    if(!member || !member.MemberId){
      throw new HttpException({
        errCode : 12,
        error : "wrong token"
      }, HttpStatus.UNAUTHORIZED);
    }

    // 토큰 생성    
    const token = await this.authService.refreshToken(tokenObj, member);
    result = {
      AccessToken : token.AccessToken,
      RefreshToken : token.RefreshToken,
      Member : {
        MemberId : member.MemberId,   
        NickName : member.NickName,            
      }
    }
    return result;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  // 인증번호 확인
  @Patch("/checkemail")
  async checkAuth(@Body() auth : Authentication){
    let result = await this.authService.checkAuthCode(auth.Email, auth.AuthCode);
    if (!result){
      throw new HttpException({
        errCode : 11,
        error : "please check the email and code"
      }, HttpStatus.BAD_REQUEST);
    }
    return {
      Email : auth.Email
    };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthenticationDto: UpdateAuthenticationDto) {
    return this.authService.update(+id, updateAuthenticationDto);
  }  

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
