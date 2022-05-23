import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
const path = require('path');

@Injectable()
export class FileHandlerService {
  async createDirectory(dirName: string) {
    if (this.checkIfExist(path.resolve(dirName))) {
      return;
    }
    await fs.promises.mkdir(path.resolve(dirName));
  }

  checkIfExist(pathToFile: string) {
    return fs.existsSync(path.resolve(pathToFile));
  }

  async readFile(dirName: string, fileName: string) {
    try {
      if (!this.checkIfExist(path.resolve(dirName, fileName))) return;
      const result = await fs.promises.readFile(
        path.resolve(dirName, fileName),
        'utf8',
      );
      return result;
    } catch (error) {
      return error;
    }
  }

  async writeToFile<T>(dirName: string, fileName: string, input: T) {
    try {
      await this.createDirectory(dirName);
      await fs.promises.writeFile(
        path.resolve(dirName, fileName),
        JSON.stringify(input),
      );
    } catch (error) {
      throw error;
    }
  }
}
