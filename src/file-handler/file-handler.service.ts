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

  async writeToFile<T>(fileName: string, input: T, ...dirsName: string[]) {
    try {
      await this.createDirectory(...dirsName);
      await fs.promises.writeFile(
        path.resolve(...dirsName, fileName),
        JSON.stringify(input),
      );
    } catch (error) {
      throw error;
    }
  }
}
