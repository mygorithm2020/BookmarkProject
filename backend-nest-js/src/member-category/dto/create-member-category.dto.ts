import { MemberCategory } from "../entities/member-category.entity"

export class CreateMemberCategoryDto {

    constructor(){
        console.log("CreateMemberCategoryDto");
    }

    Name: string;
    MemberId : string;

    getEntity(obj : CreateMemberCategoryDto) : MemberCategory{
        const result : MemberCategory = new MemberCategory();
        return result;

    }
}
