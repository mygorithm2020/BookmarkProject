import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { Authentication } from './entities/authentication.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomUtils, FileAdapter } from 'src/publicComponents/utils';
import { Constraint } from 'src/publicComponents/constraint';
import { ApiClient } from 'src/publicComponents/apiClient';
import { MemberModule } from 'src/member/member.module';
import { AuthToken } from './entities/authtoken.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/authentication/entities/Auth.constant';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([Authentication, AuthToken]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.accessSecret,
      signOptions: { expiresIn: jwtConstants.accessExpiresIn },
    }),
    MemberModule,
    HttpModule,
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    CustomUtils,
    Constraint,
    ApiClient,
    FileAdapter,
  ],
})
export class AuthenticationModule {}
