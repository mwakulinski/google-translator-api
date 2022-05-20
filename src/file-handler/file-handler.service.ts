import { Injectable } from '@nestjs/common';
import { dir } from 'console';
import * as fs from 'fs';
const path = require('path');

@Injectable()
export class FileHandlerService {
  async readFile(dirName: string, fileName: string) {
    try {
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
    // try {
    //   const response = fs.promises.stat(path.resolve(dirName));
    //   console.log(response);
    // } catch (error) {
    //   await fs.promises.mkdir(path.resolve(dirName));
    // }

    try {
      if (!fs.existsSync(path.resolve(dirName))) {
        await fs.promises.mkdir(path.resolve(dirName));
      }
      await fs.promises.writeFile(
        path.resolve(dirName, fileName),
        JSON.stringify(input),
      );
    } catch (error) {
      throw error;
    }
  }
}
