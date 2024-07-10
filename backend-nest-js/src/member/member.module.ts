import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { CustomEncrypt, CustomUtils } from 'src/publicComponents/utils';

@Module({
  imports : [
    TypeOrmModule.forFeature([
      Member
    ]),
    
    
  ],
  controllers: [MemberController],
  providers: [MemberService, CustomUtils],
})
export class MemberModule {}
