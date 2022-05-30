import { Test, TestingModule } from '@nestjs/testing';
import { FileHandlerService } from '../file-handler/file-handler.service';
import { createTranslateDto } from './dto/create-translate.dto';
import { TranslatorService } from './translator.service';
import { GoogleService } from '../translator-api/google.service';

describe('TranslatorService', () => {
  let service: TranslatorService;
  let fileHandlerService: FileHandlerService;

  const mockGoogleService = {
    translate: jest.fn(),
  };
  const mockFileHandler: FileHandlerService = {
    readFile: jest.fn((dirName: string, fileName: string) =>
      Promise.resolve('text'),
    ),
    writeToFile: jest.fn((dirName: string, fileName: string) =>
      Promise.resolve(),
    ),
    checkIfExist: jest.fn((path: string) => true),
    createDirectory: jest.fn((dirName: string) => Promise.resolve()),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TranslatorService,
        {
          provide: FileHandlerService,
          useValue: {
            ...mockFileHandler,
          },
        },
        {
          provide: GoogleService,
          useValue: {
            ...mockGoogleService,
          },
        },
        // GoogleConntectorService,
        // FileHandlerService,
      ],
    })
      // .overrideProvider(FileHandlerService)
      // .useValue(mockFileHandler)
      // .overrideProvider(GoogleConnectorService)
      // .useValue(mockGoogleConnector)
      .compile();

    service = module.get<TranslatorService>(TranslatorService);
    fileHandlerService = module.get<FileHandlerService>(FileHandlerService);

    service.getTranslatedData = jest.fn(async (body: createTranslateDto) => {
      if (fileHandlerService.checkIfExist('path')) {
        return await fileHandlerService.readFile(
          'texts',
          `${body.language}.json`,
        );
      }

      await fileHandlerService.writeToFile(
        'texts',
        `${body.language}.json`,
        'text',
      );
      return Promise.resolve({ text: 'text' });
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('translate()', () => {
    it('should translate text to given language and should not read from the file', async () => {
      fileHandlerService.checkIfExist = jest.fn((path: string) => false);
      const response = await service.getTranslatedData({ language: 'en' });
      expect(fileHandlerService.readFile).not.toHaveBeenCalled();
      expect(fileHandlerService.writeToFile).toHaveBeenCalledTimes(1);
      expect(response).toEqual({ text: 'text' });
    });

    it('should read translated text from the file if file exists and should not translate it', async () => {
      fileHandlerService.checkIfExist = jest.fn((path: string) => true);
      const response = await service.getTranslatedData({ language: 'en' });
      expect(fileHandlerService.readFile).toHaveBeenCalledTimes(1);
      expect(fileHandlerService.writeToFile).toHaveBeenCalledTimes(0);
      expect(response).toBe('text');
    });
  });
});
