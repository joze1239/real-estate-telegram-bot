import { Test, TestingModule } from '@nestjs/testing';
import { PageViewService } from './page-view.service';

describe('PageViewService', () => {
  let service: PageViewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PageViewService],
    }).compile();

    service = module.get<PageViewService>(PageViewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
