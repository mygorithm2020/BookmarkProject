import { Module } from '@nestjs/common';
import { MemberSiteService } from './member-site.service';
import { MemberSiteController } from './member-site.controller';

@Module({
  controllers: [MemberSiteController],
  providers: [MemberSiteService],
})
export class MemberSiteModule {}
