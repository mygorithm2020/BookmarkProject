import { Test, TestingModule } from '@nestjs/testing';
import { MemberSiteController } from './member-site.controller';
import { MemberSiteService } from './member-site.service';

describe('MemberSiteController', () => {
  let controller: MemberSiteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemberSiteController],
      providers: [MemberSiteService],
    }).compile();

    controller = module.get<MemberSiteController>(MemberSiteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
