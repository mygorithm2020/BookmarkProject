import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports : [
    HttpModule,
  ],
  controllers: [TestController]
})
export class TestModule {}
