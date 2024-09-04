import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from './roles.decorator';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants, jwtConstantsAdmin } from 'src/member/entities/memberAuth.constant';
import { Request } from 'express';
import { HttpErrorCode } from 'src/publicComponents/ExceptionHandler';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
//     const request = context.switchToHttp().getRequest();
//     return validateRequest(request);
//   }
// }

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
    
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        console.log("guard");        
        return true;

        const roles = this.reflector.get(Roles, context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        console.log(request);
        const user = request.user;
        // return matchRoles(roles, user.roles);
    }
}


@Injectable()
export class CustomAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    console.log("token" + token);
    if (!token) {
      // throw new UnauthorizedException();
      throw new HttpException({
        errCode : HttpErrorCode.AuthOne,
        error : "authorizaion is required in header"
      }, HttpStatus.UNAUTHORIZED);
    }
    try {
      console.log("Sdsd");
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstants.accessSecret
        }
      );
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch (err) {
      console.log(err);
      throw new HttpException({
        errCode : HttpErrorCode.AuthTwo,
        error : "token is expired"
      }, HttpStatus.UNAUTHORIZED);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}


export class AdminAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    console.log("token" + token);
    if (!token) {
      // throw new UnauthorizedException();
      throw new HttpException({
        errCode : HttpErrorCode.AuthOne,
        error : "authorizaion is required in header"
      }, HttpStatus.UNAUTHORIZED);
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstantsAdmin.accessSecret
        }
      );

      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch (err) {
      console.log(err);
      throw new HttpException({
        errCode : HttpErrorCode.AuthTwo,
        error : "token is expired"
      }, HttpStatus.UNAUTHORIZED);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
