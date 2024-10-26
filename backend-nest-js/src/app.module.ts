import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { CategoryModule } from './category/category.module';
import { ConfigModule } from '@nestjs/config';
import { SiteModule } from './site/site.module';
import * as dotenv from 'dotenv';
import { HttpModule } from '@nestjs/axios';
import { MemberModule } from './member/member.module';
import { CustomUtils, FileAdapter } from './publicComponents/utils';
import { AuthenticationModule } from './authentication/authentication.module';
import {
  FirewallMiddleware,
  LoggerMiddleware,
} from './middleware/logger.middleware';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './middleware/logging.interceptor';
import { Constraint } from './publicComponents/constraint';
import { ApiClient } from './publicComponents/apiClient';
import { JwtService } from './auth/jwt/jwt.service';
import { MemberBookmarkModule } from './member-bookmark/member-bookmark.module';

dotenv.config();

console.log(process.env.DB_HOST);

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'images'),
      serveRoot: '/images',
      serveStaticOptions: {
        index: false, // 인덱스 파일 제공 여부 설정
        maxAge: 600000, // 캐시 유효 기간 설정
      },
    },
    // { nginx에서 ip 제한 추가하면 같이 추가
    //   rootPath: join(__dirname, '..', 'log'),
    //   serveRoot: '/serverlog',
    //   serveStaticOptions: {
    //     index: false, // 인덱스 파일 제공 여부 설정
    //     maxAge: 10000, // 캐시 유효 기간 설정
    //   },
    // }
    ),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      // entities : [Book, Category, Site, Member],
      autoLoadEntities: true, // 이렇게 하면 릴레이션에만 있고 forFeature(각 세부 모듈)에 없으면 등록 안됨
      database: process.env.DB_DATABASE,
      synchronize: false,
      logging: true,
      timezone: 'z', // mysql에 들어있는 시간에서 자동으로 -9시간을 해오는거 해결
    }),
    BooksModule,
    CategoryModule,
    SiteModule,
    MemberModule,
    AuthenticationModule,
    HttpModule,
    MemberBookmarkModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CustomUtils,
    FileAdapter,
    Constraint,
    ApiClient,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    JwtService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, FirewallMiddleware)
      .exclude({ path: '/', method: RequestMethod.POST })
      .forRoutes('*');
  }
}
