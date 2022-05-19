import { Test, TestingModule } from '@nestjs/testing';
import { GoogleConntectorService } from './google-conntector.service';

describe('GoogleConntectorService', () => {
  let service: GoogleConntectorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleConntectorService],
    }).compile();

    service = module.get<GoogleConntectorService>(GoogleConntectorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
