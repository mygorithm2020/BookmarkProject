// // import { JwtPayload } from './jwt-payload.interface'; // JWT 페이로드 인터페이스 정의

// import { Injectable } from "@nestjs/common";
// import { PassportStrategy } from "@nestjs/passport";

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor() {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: 'your_jwt_secret', // 실제 JWT 비밀키로 교체
//     });
//   }

//   async validate(payload: JwtPayload) {
//     // 페이로드를 검증하고 필요한 경우 사용자 정보를 반환
//     return { userId: payload.sub, username: payload.username };
//   }
// }
