import { Module } from '@nestjs/common';
import { MemberBookmarkService } from './member-bookmark.service';
import { MemberBookmarkController } from './member-bookmark.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberBookmark } from './entities/member-bookmark.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([MemberBookmark]), HttpModule],
  controllers: [MemberBookmarkController],
  providers: [MemberBookmarkService],
})
export class MemberBookmarkModule {}
