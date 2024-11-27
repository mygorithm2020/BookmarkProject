import { Test, TestingModule } from '@nestjs/testing';
import { MemberCategoryService } from './member-category.service';

describe('MemberCategoryService', () => {
  let service: MemberCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemberCategoryService],
    }).compile();

    service = module.get<MemberCategoryService>(MemberCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
