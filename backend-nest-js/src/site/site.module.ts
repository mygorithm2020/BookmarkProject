import { Module } from '@nestjs/common';
import { SiteService } from './site.service';
import { SiteController } from './site.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Site } from './entities/site.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports : [TypeOrmModule.forFeature([
    Site
  ]), HttpModule],
  controllers: [SiteController],
  providers: [SiteService],
})
export class SiteModule {}
