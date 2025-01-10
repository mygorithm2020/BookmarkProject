import { Test, TestingModule } from '@nestjs/testing';
import { MemberSiteService } from './member-site.service';

describe('MemberSiteService', () => {
  let service: MemberSiteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemberSiteService],
    }).compile();

    service = module.get<MemberSiteService>(MemberSiteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
