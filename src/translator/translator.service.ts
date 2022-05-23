import { Injectable } from '@nestjs/common';
import { GoogleConnectorService } from './google-conntector/google-conntector.service';
import { createTranslateDto } from './dto/create-translate.dto';
import { FileHandlerService } from '../file-handler/file-handler.service';

@Injectable()
export class TranslatorService {
  constructor(
    private readonly googleConnectorService: GoogleConnectorService,
    private readonly fileHandlerService: FileHandlerService,
  ) {}

  async getTranslatedData<T>(body: createTranslateDto, objectToTranslate: T) {
    const readData = await this.fileHandlerService.readFile(
      'texts', //===> skąd brać nazwę folderu w prawdziwym projekcie?
      `${body.language}.json`,
    );
    if (readData) return JSON.parse(readData);

    const TranslatedData = await this.translate(body, objectToTranslate);
    const translatedObject = await this.createTranslatedObject(
      objectToTranslate,
      0,
      TranslatedData,
    );

    await this.fileHandlerService.writeToFile(
      'texts',
      `${body.language}.json`,
      translatedObject,
    );

    return translatedObject;
  }

  private async translate<T>(body: createTranslateDto, objectToTranslate: T) {
    try {
      const arrayOfTextsToTranslate = await this.getDataToTranslate(
        objectToTranslate,
      );
      const response = await this.googleConnectorService.translate(
        arrayOfTextsToTranslate,
        body.language,
      );
      return response;
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

  private async getDataToTranslate<T>(objectToTranslate: T) {
    const arrayOfValues: string[] = [];
    this.getObjectValues(objectToTranslate, arrayOfValues);
    return arrayOfValues;
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
