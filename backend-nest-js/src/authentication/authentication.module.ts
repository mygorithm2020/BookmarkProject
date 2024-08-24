import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { Authentication } from './entities/authentication.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomUtils, FileAdapter } from 'src/publicComponents/utils';
import { Constraint } from 'src/publicComponents/constraint';
import { ApiClient } from 'src/publicComponents/apiClient';

@Module({
  imports : [
    TypeOrmModule.forFeature([
      Authentication
    ]),    
    
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, CustomUtils, Constraint, ApiClient, FileAdapter],
})
export class AuthenticationModule {}
