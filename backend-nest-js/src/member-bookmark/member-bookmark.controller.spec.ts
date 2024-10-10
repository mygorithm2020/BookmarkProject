import { Test, TestingModule } from '@nestjs/testing';
import { MemberBookmarkController } from './member-bookmark.controller';
import { MemberBookmarkService } from './member-bookmark.service';

describe('MemberBookmarkController', () => {
  let controller: MemberBookmarkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemberBookmarkController],
      providers: [MemberBookmarkService],
    }).compile();

    controller = module.get<MemberBookmarkController>(MemberBookmarkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
