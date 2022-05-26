import { Injectable } from '@nestjs/common';
import { GoogleConnector } from '../google/google-conntector/google-connector';
import { createTranslateDto } from './dto/create-translate.dto';
import { FileHandlerService } from '../file-handler/file-handler.service';
import { GoogleService } from '../google/google.service';
import { GoogleLibraryService } from '../google/google-conntector/google-library/google-library.service';
import { GoogleRestTranslatorService } from 'src/google/google-conntector/google-rest-translator/google-rest-translator.service';
const path = require('path');

const fileNames = {
  textsDir: 'texts',
  fileWithObject: 'pl.json',
};

@Injectable()
export class TranslatorService {
  constructor(
    private readonly googleService: GoogleService,
    private readonly fileHandlerService: FileHandlerService,
  ) {}

  //1 Jest obiekt
  //no to mockuje fileHandlerService i sprwdzam czy jest to co zwraca
  //2 nie ma
  //czytam googla i sprawdzam czy fileHandlerservice miał coś zapisać i zwraca przetłumaczone wartości
  async getTranslatedData<T>(body: createTranslateDto) {
    if (
      this.fileHandlerService.checkIfExist(
        path.resolve(fileNames.textsDir, `${body.language}.json`),
      )
    ) {
      const readData = await this.fileHandlerService.readFile(
        fileNames.textsDir,
        `${body.language}.json`,
      );
      return JSON.parse(readData);
    }

    const objectToTranslate = JSON.parse(
      await this.fileHandlerService.readFile(
        fileNames.textsDir,
        fileNames.fileWithObject,
      ),
    );

    const translatedData = await this.translate(
      body,
      objectToTranslate,
      new GoogleRestTranslatorService(),
    );
    // new GoogleRestTranslatorService()
    // new GoogleLibraryService(),
    const translatedObject = await this.createTranslatedObject(
      objectToTranslate,
      0,
      translatedData,
    );

    await this.fileHandlerService.writeToFile(
      fileNames.textsDir,
      `${body.language}.json`,
      translatedObject,
    );

    return translatedObject;
  }

  private async translate<T>(
    body: createTranslateDto,
    objectToTranslate: T,
    googleTranslationsClass: GoogleConnector,
  ) {
    try {
      const arrayOfTextsToTranslate = [];
      this.getObjectValues(objectToTranslate, arrayOfTextsToTranslate);
      return await this.googleService.translate(
        googleTranslationsClass,
        arrayOfTextsToTranslate,
        body.language,
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  private createTranslatedObject<T>(
    data: T,
    index: number,
    translatedValuesArray: string[],
  ) {
    const keys = Object.keys(data);
    keys.forEach((key) => {
      if (typeof data[key] === 'object') {
        return this.createTranslatedObject(
          data[key],
          index,
          translatedValuesArray,
        );
      }
      data[key] = translatedValuesArray[index];
      index++;
    });
    return data;
  }

  private getObjectValues<T>(data: T, valuesArray: string[]) {
    if (typeof data === 'object') {
      const values = Object.values(data);
      values.forEach((value) => {
        if (typeof value === 'object') {
          return this.getObjectValues(value, valuesArray);
        }
        valuesArray.push(value);
        return;
      });
    }
  }
}
