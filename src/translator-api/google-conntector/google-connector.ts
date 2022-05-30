export abstract class GoogleConnector {
  public async translate(textToTranslate: string[], language: string) {
    return await this.translateData(textToTranslate, language);
  }

  protected abstract translateData(textToTranslate: string[], language: string);
}
