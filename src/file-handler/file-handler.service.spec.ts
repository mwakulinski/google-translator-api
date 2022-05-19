import { Test, TestingModule } from '@nestjs/testing';
import { FileHandlerService } from './file-handler.service';
import * as fs from 'fs';

// jest.mock('fs', () => ({
//   promises: {
//     writeFile: jest.fn(),
//     readFile: jest.fn(),
//     mkdir: jest.fn(),
//   },
//   existsSync: jest.fn(),
// }));

describe('FileHandlerService', () => {
  let service: FileHandlerService;
  fs.promises.writeFile = jest.fn();
  fs.promises.readFile = jest.fn();
  fs.promises.mkdir = jest.fn();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileHandlerService],
    }).compile();
    service = module.get<FileHandlerService>(FileHandlerService);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('if folder exists should not create it and should write input data to the file with given name', async () => {
    //@ts-ignore
    fs.existsSync = jest.fn().mockReturnValue(false);
    await service.writeToFile('texts', 'en.json', { ok: 'daradę' });
    expect(fs.promises.mkdir).toHaveBeenCalledTimes(1);
    expect(fs.promises.writeFile).toHaveBeenCalledTimes(1);
  });

  it("if folder doesn't exist should create it and should write input data to the file with given name", async () => {
    //@ts-ignore
    fs.existsSync = jest.fn().mockReturnValue(true);
    await service.writeToFile('texts', 'en.json', { ok: 'daradę' });
    expect(fs.promises.mkdir).toHaveBeenCalledTimes(0);
    expect(fs.promises.writeFile).toHaveBeenCalledTimes(1);
  });
});
