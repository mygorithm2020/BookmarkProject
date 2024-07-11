import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { Authentication } from './entities/authentication.entity';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post()
  create(@Body() createAuthenticationDto: CreateAuthenticationDto) {
    return this.authService.create(createAuthenticationDto);
  }

  //인증번호 발송
  @Post("/email")
  sendEmailAuth(
    @Body() auth : Authentication){
    let result = this.authService.sendAuthEmail(auth.Email);
    return result;
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthenticationDto: UpdateAuthenticationDto) {
    return this.authService.update(+id, updateAuthenticationDto);
  }

  // 인증 번호 확인
  @Patch()
  checkEmailAuth(@Body() auth: Authentication) {
    return this.authService.checkAuthEmail(auth.Email, auth.AuthCode);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
