import { Member } from "../entities/member.entity";

export class CreateMemberDto extends Member{
    AuthCode : string;
}
