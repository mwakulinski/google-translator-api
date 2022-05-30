import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
const path = require('path');

@Injectable()
export class FileHandlerService {
  async createDirectory(...dirsName: string[]) {
    if (this.checkIfExist(path.resolve(...dirsName))) {
      return;
    }
    await fs.promises.mkdir(path.resolve(...dirsName));
  }

  checkIfExist(...filesInPath: string[]): boolean {
    return fs.existsSync(path.resolve(...filesInPath));
  }

  async readFile(fileName: string, ...dirsInPath: string[]) {
    return fs.promises.readFile(path.resolve(...dirsInPath, fileName), 'utf8');
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
