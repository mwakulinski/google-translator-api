import { Test, TestingModule } from '@nestjs/testing';
import { GoogleLibraryTranslatorService } from './google-library-translator.service';

describe('GoogleLibraryService', () => {
  let service: GoogleLibraryTranslatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleLibraryTranslatorService],
    }).compile();

    service = module.get<GoogleLibraryTranslatorService>(
      GoogleLibraryTranslatorService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
