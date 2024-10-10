import { Test, TestingModule } from '@nestjs/testing';
import { MemberBookmarkService } from './member-bookmark.service';

describe('MemberBookmarkService', () => {
  let service: MemberBookmarkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemberBookmarkService],
    }).compile();

    service = module.get<MemberBookmarkService>(MemberBookmarkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
