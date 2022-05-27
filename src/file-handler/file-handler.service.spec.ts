import { Test, TestingModule } from '@nestjs/testing';
import { FileHandlerService } from './file-handler.service';
import * as fs from 'fs';
const path = require('path');

//alternatywa dla celów naukowych
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
  //@ts-ignore
  fs.existsSync = jest.fn();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileHandlerService],
    }).compile();
    service = module.get<FileHandlerService>(FileHandlerService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('writeToFile', () => {
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

  describe('readFile()', () => {
    it('should read data form file', async () => {
      //@ts-ignore
      fs.existsSync = jest.fn().mockReturnValue(true);
      await service.readFile('texts', 'en.json');
      expect(fs.promises.readFile).toHaveBeenCalledTimes(1);
    });
  });

  describe('checkIfExist', () => {
    it('should read data form file', async () => {
      //@ts-ignore
      fs.existsSync = jest.fn();
      service.checkIfExist(path.resolve('texts'));
      expect(fs.existsSync).toHaveBeenCalledTimes(1);
    });
  });

  describe('createDirectory', () => {
    it('should create new a directory', async () => {
      //@ts-ignore
      fs.existsSync = jest.fn(() => false);
      await service.createDirectory(path.resolve('texts'));
      expect(fs.promises.mkdir).toHaveBeenCalledTimes(1);
    });
  });
});
