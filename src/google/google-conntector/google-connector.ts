import { Injectable } from '@nestjs/common';
// import { v2 } from '@google-cloud/translate';
import { ConfigService } from '@nestjs/config';
//rest translatora
//To ja chce mieć dwie klasy Translatorów - jedna niech korzysta z REST druga z biblioteki
//Zastosuj metodę szablonową

export abstract class GoogleConnector {
  // constructro(configModule: ConfigService) {}

  public async translate(textToTranslate: string[], language: string) {
    return await this.translateData(textToTranslate, language);
    // this.createTranslatorService()?.translateData(
    //   textToTranslate,
    //   language,
    // ) ?? this.translateData(textToTranslate, language)
  }

  protected abstract createTranslatorService();
  protected abstract translateData(textToTranslate: string[], language: string);

  // private createTranslatorService() {
  //   const projectId = process.env.PROJECT_ID;
  //   const credentials = JSON.parse(process.env.CREDENTIALS);
  //   return new v2.Translate({
  //     credentials,
  //     projectId,
  //   });
  // }

  // async translate(textToTranslate: string[], language: string) {
  //   const [response] = await this.createTranslatorService().translate(
  //     textToTranslate,
  //     language,
  //   );
  //   return response;
  // }
}
