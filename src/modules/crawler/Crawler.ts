export abstract class Crawler {
  abstract getHtml(url: string): Promise<string>;
}
