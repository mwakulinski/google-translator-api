import { Test, TestingModule } from '@nestjs/testing';
import { GoogleRestTranslatorService } from './google-rest-translator.service';

describe('GoogleRestTranslatorService', () => {
  let service: GoogleRestTranslatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleRestTranslatorService],
    }).compile();

    service = module.get<GoogleRestTranslatorService>(GoogleRestTranslatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
