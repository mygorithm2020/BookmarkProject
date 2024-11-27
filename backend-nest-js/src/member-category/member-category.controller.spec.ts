import { Test, TestingModule } from '@nestjs/testing';
import { MemberCategoryController } from './member-category.controller';
import { MemberCategoryService } from './member-category.service';

describe('MemberCategoryController', () => {
  let controller: MemberCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemberCategoryController],
      providers: [MemberCategoryService],
    }).compile();

    controller = module.get<MemberCategoryController>(MemberCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
