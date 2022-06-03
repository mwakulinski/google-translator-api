import { Injectable } from '@nestjs/common';
import { GoogleConnector } from '../translator-api/google-conntector/google-connector';
import { createTranslateDto as CreateTranslateDto } from './dto/create-translate.dto';
import { FileHandlerService } from '../file-handler/file-handler.service';
import { GoogleService } from '../translator-api/google.service';
import { GoogleLibraryTranslatorService } from '../translator-api/google-conntector/google-library-translator/google-library-translator.service';
import { GoogleRestTranslatorService } from '../translator-api/google-conntector/google-rest-translator/google-rest-translator.service';
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

  async getTranslatedData(body: CreateTranslateDto) {
    if (
      this.fileHandlerService.checkIfExist(
        fileNames.textsDir,
        `${body.language}.json`,
      )
    ) {
      return JSON.parse(
        await this.fileHandlerService.readFile(
          `${body.language}.json`,
          fileNames.textsDir,
        ),
      );
    }

    const objectToTranslate = JSON.parse(
      await this.fileHandlerService.readFile(
        fileNames.fileWithObject,
        fileNames.textsDir,
      ),
    );

    const translatedData = await this.translate(
      body,
      objectToTranslate,
      new GoogleRestTranslatorService(),
    );
    // new GoogleRestTranslatorService()
    // new GoogleLibraryService(),
    let indexOfTranslatedValuesArray = 0;
    const translatedObject = await this.createTranslatedObject(
      objectToTranslate,
      indexOfTranslatedValuesArray,
      translatedData,
    );

    await this.fileHandlerService.writeToFile(
      `${body.language}.json`,
      translatedObject,
      fileNames.textsDir,
    );

    return translatedObject;
  }

  private async translate<T extends object>(
    body: CreateTranslateDto,
    objectToTranslate: T | string,
    googleTranslationsClass: GoogleConnector,
  ) {
    try {
      const arrayOfTextsToTranslate =
        this.getValuesToTranslate(objectToTranslate);
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

  private getObjectValues<T>(ObjectToTakeValuesFrom: T, valuesArray: string[]) {
    const values = Object.values(ObjectToTakeValuesFrom);
    values.forEach((value) => {
      if (typeof value === 'object') {
        return this.getObjectValues(value, valuesArray);
      }
      valuesArray.push(value);
    });
  }

  private getValuesToTranslate<T extends object>(dataToTranslate: T | string) {
    const valuesToTranslate = [];
    if (typeof dataToTranslate === 'object') {
      this.getObjectValues(dataToTranslate, valuesToTranslate);
    } else {
      valuesToTranslate.push(dataToTranslate);
    }
    return valuesToTranslate;
  }
}
