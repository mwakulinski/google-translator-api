import { Test, TestingModule } from '@nestjs/testing';
import { GoogleConnectorService } from './google-conntector.service';

describe('GoogleConntectorService', () => {
  let service: GoogleConnectorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleConnectorService],
    }).compile();

    service = module.get<GoogleConnectorService>(GoogleConnectorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
