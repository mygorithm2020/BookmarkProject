import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { AdminAuthGuard, CustomAuthGuard } from 'src/middleware/auth.guard';
import { Request } from 'express';
import { CustomEncrypt } from 'src/publicComponents/utils';

@ApiTags('member')
@Controller('member')
// @UseGuards(AuthGuard)
export class MemberController {
  constructor(
    private readonly memberService: MemberService,
    private readonly authService: AuthenticationService,
  ) {}

  @Post('/signup')
  async create(@Body() createMemberDto: CreateMemberDto) {
    let result = null;

    const authRecord = await this.authService.findByEmailAdmin(
      createMemberDto.MemEmail,
    );
    if (!authRecord || authRecord.length == 0) {
      throw new HttpException(
        {
          errCode: 11,
          error:
            'not exist auth request record, please complete email authentication first',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // 인증여부 확인, 10시간 이내에 인증 기록이 있는가
    if (
      authRecord[0].IsAuth == 1 &&
      new Date().getTime() - authRecord[0].UpdateDate.getTime() < 36000000
    ) {
      const mem = await this.memberService.createPublic(createMemberDto);
      if (mem && mem.MemberId) {
        result = { MemEmail: mem.MemEmail };
      }
    } else {
      throw new HttpException(
        {
          errCode: 12,
          error: 'authentication is not checked yet, please complete first',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }

  @Get('/admin')
  @UseGuards(AdminAuthGuard)
  findAll() {
    const res = this.memberService.findAllAdmin();
    return res;
  }

  // 중복확인
  // 있으면 요청값을 결과 주고
  // 없으면 빈 값 리턴
  @Get('/duplicate')
  async checkDuplicate(@Query('email') email: string) {
    email = decodeURIComponent(email);

    const result = await this.memberService.findOneByEmailPublic(email);
    if (result && result.MemberId) {
      return { Email: email };
    }
    return {};
  }

  @UseGuards(CustomAuthGuard)
  // @Get("/email")
  findOnebyEmail(@Query('email') email: string) {
    email = decodeURIComponent(email);
    const result = this.memberService.findOneByEmailPublic(email);
    return result;
  }

  @UseGuards(CustomAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memberService.findOnePublic(id);
  }

  @Patch('/info')
  async changeInfo(@Body() updateMemberDto: Member) {
    let result = null;
    const updateRes = await this.memberService.updatePublic(
      updateMemberDto.MemberId,
      updateMemberDto,
    );
    if (updateRes != 1) {
      throw new HttpException(
        {
          errCode: 11,
          error: 'There in no matched id',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    result = updateMemberDto;
    return result;
  }

  @Patch('/password')
  async changePassword(
    @Body() updateMemberDto: { MemberId; Password; NewPassword },
  ) {
    // 기존 패스워드 비교 후 같으면
    const member = await this.memberService.findOneByIdAdmin(
      updateMemberDto.MemberId,
    );
    updateMemberDto.Password = CustomEncrypt.getInstance().encryptHash(
      updateMemberDto.Password,
    );
    if (member.Password != updateMemberDto.Password) {
      throw new HttpException(
        {
          errCode: 11,
          error: 'ID or PW does not match',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    // 새로운 패스워드로 변경
    return this.memberService.updatePWPublic(
      updateMemberDto.MemberId,
      updateMemberDto.NewPassword,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memberService.remove(id);
  }
}
