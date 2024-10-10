import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Authentication } from './entities/authentication.entity';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { CustomEncrypt, CustomUtils } from 'src/publicComponents/utils';
import { Constraint } from 'src/publicComponents/constraint';
import { ApiClient } from 'src/publicComponents/apiClient';
import { Member } from 'src/member/entities/member.entity';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/authentication/entities/Auth.constant';
import { AuthToken } from './entities/authtoken.entity';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(Authentication) private aRepo: Repository<Authentication>,
    @InjectRepository(AuthToken) private atRepo: Repository<AuthToken>,
    private readonly customUtils: CustomUtils,
    private readonly constraint: Constraint,
    private readonly apiClient: ApiClient,
    private dataSource: DataSource,
    private jwtService: JwtService,
  ) {
    console.log('new AuthenticationService');
  }

  create(createAuthenticationDto: CreateAuthenticationDto) {
    return 'This action adds a new authentication';
  }

  async sendAuthEmail(email: string): Promise<boolean> {
    let res = false;

    const auth: Authentication = new Authentication();
    console.log(email);

    if (!email || !this.constraint.isValidEmail(email)) {
      throw new HttpException(
        {
          errCode: 21,
          error: 'email value is required',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const prevAuth = await this.findByEmailAdmin(email);
    if (
      prevAuth &&
      prevAuth.length > 0 &&
      new Date().getTime() - prevAuth[0].CreateDate.getTime() < 120000
    ) {
      throw new HttpException(
        {
          errCode: 23,
          error:
            'identical email was enrolled, please try again in a few minutes',
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    auth.Email = email;
    // 6자리 수
    auth.AuthCode = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0');
    auth.IsAuth = 0;

    // 디비에 인증번호랑 등록
    const saveRes = await this.aRepo.save(auth);
    console.log(saveRes);

    if (!saveRes.Email || !saveRes.AuthCode) {
      throw new HttpException(
        {
          errCode: 22,
          error: 'authcode create error, please try again',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // 이메일 보내고 => 이건 안기다려도 될듯
    if (false) {
    }

    // 컨트롤러와 상관 없이 리턴값 생성
    // 결과 리턴
    res = true;
    return res;
  }

  async createToken(
    member: Member,
    ip: string,
    userAgent: string,
    origin: string,
  ): Promise<{ AccessToken: string; RefreshToken: string }> {
    // // 세션에 등록
    // if (false){
    //   let sessionId : string = await this.constraint.makeSessionId(member.MemberId);
    //   ServerCache.setSession(sessionId);
    //   sessionId = cEncrypt.encryptAes256(sessionId);
    //   // 세션 키 리턴
    //   // return sessionId;
    // }

    return {
      AccessToken: await this.createAccessToken(member),
      RefreshToken: await this.createRefreshToken(
        member.MemberId,
        ip,
        userAgent,
        origin,
      ),
    };
  }

  async createAccessToken(member: Member): Promise<string> {
    const cEncrypt = CustomEncrypt.getInstance();
    // JWT 방식
    // 여기서 페이로드 값을 암호화 하고 다시 체크할 때 복호화해서 쓰자
    const payload = {
      V: cEncrypt.encryptAes256(
        JSON.stringify({
          I: member.MemEmail,
          Ae: member.Authentication,
          Ao: member.Authorization,
        }),
      ),
    };
    const aToken = await this.jwtService.signAsync(payload);

    return aToken;
  }

  async createRefreshToken(
    memberId: string,
    ip: string,
    userAgent: string,
    origin: string,
  ): Promise<string> {
    // const cEncrypt = CustomEncrypt.getInstance();
    // JWT 방식
    const refreshPayload = { DT: this.customUtils.getUTCDate() };
    const rToken = await this.jwtService.signAsync(refreshPayload, {
      secret: jwtConstants.refreshSecret,
      expiresIn: jwtConstants.refreshExpiresIn,
    });

    // 리프레시 토큰 디비 저장
    const at = new AuthToken();
    at.Token = rToken;
    at.MemberId = memberId;
    at.IP = ip;
    at.UserAgent = userAgent;
    at.Origin = origin;
    await this.createAuthToken(at);

    return rToken;
  }

  async refreshToken(
    tokenObj: AuthToken,
    member: Member,
  ): Promise<{ AccessToken: string; RefreshToken: string }> {
    // 정상이면 엑세스 토큰 생성
    try {
      const payload = await this.jwtService.verifyAsync(tokenObj.Token, {
        secret: jwtConstants.refreshSecret,
      });
      console.log(JSON.stringify(payload));
    } catch (err) {
      console.log(err);
      throw new HttpException(
        {
          errCode: 22,
          error: 'expired token',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const aToken = await this.createAccessToken(member);
    let rToken = tokenObj.Token;

    // 그렇다면 리프레쉬 토큰은 언제 업데이트?
    // 데이터 저장 되어 있으니 생성기준 얼마 안남았으면 재 생성 해주자
    if (
      this.customUtils.getUTCDate().getTime() - tokenObj.CreateDate.getTime() >
      jwtConstants.reIssueRefreshTokenTime
    ) {
      rToken = await this.createRefreshToken(
        member.MemberId,
        tokenObj.IP,
        tokenObj.UserAgent,
        tokenObj.Origin,
      );
    }

    return {
      AccessToken: aToken,
      RefreshToken: rToken,
    };
  }

  findAll() {
    return `This action returns all authentication`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authentication`;
  }

  findOneByTokenAdmin(token: string): Promise<AuthToken> {
    const res = this.atRepo.findOne({
      where: {
        Token: token,
      },
      order: {
        CreateDate: 'DESC',
      },
    });
    return res;
  }

  async findByEmailAdmin(email: string): Promise<Authentication[]> {
    const res = this.aRepo.find({
      where: {
        Email: email,
      },
      order: {
        CreateDate: 'DESC',
      },
    });
    return res;
  }

  async deleteToken(token: string): Promise<UpdateResult> {
    if (!token) {
      return null;
    }
    const change = await this.atRepo.update(
      {
        Token: token,
      },
      {
        Token: null,
      },
    );
    return change;
  }

  // 리프레시 토큰 삭제
  update(id: number, updateAuthenticationDto: UpdateAuthenticationDto) {
    return `This action updates a #${id} authentication`;
  }

  async checkAuthCode(authKey: string, authCode: string): Promise<boolean> {
    let res = false;
    // 비교해서 5분 이내에 인증했으면 완료 아니면 실패
    const prevAuth = await this.findByEmailAdmin(authKey);
    console.log(authKey, authCode);
    console.log(prevAuth);
    for (const pA of prevAuth) {
      if (
        pA.AuthCode == authCode &&
        new Date().getTime() - pA.CreateDate.getTime() < 300000
      ) {
        const change = await this.aRepo.update(
          {
            Email: authKey,
            AuthCode: authCode,
          },
          {
            IsAuth: 1,
            UpdateDate: this.customUtils.getUTCDate(),
          },
        );
        if (change.affected == 1) {
          res = true;
        }
        break;
      }
    }
    // 아니면 에러
    return res;
  }

  remove(id: number) {
    return `This action removes a #${id} authentication`;
  }

  createAuthToken(refreshToken: AuthToken): Promise<AuthToken> {
    if (!refreshToken.Token || !refreshToken.MemberId) {
      throw new HttpException(
        {
          errCode: 21,
          error: 'failed to save token',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const res = this.atRepo.save(this.atRepo.create(refreshToken));
    return res;
  }
}
