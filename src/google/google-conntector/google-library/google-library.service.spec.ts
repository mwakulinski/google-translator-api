import { Test, TestingModule } from '@nestjs/testing';
import { GoogleLibraryService } from './google-library.service';

describe('GoogleLibraryService', () => {
  let service: GoogleLibraryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleLibraryService],
    }).compile();

    service = module.get<GoogleLibraryService>(GoogleLibraryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
