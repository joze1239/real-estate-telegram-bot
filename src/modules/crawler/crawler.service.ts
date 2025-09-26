import { Injectable, Logger } from '@nestjs/common';
import cheerio from 'cheerio';

import { Website, websites } from './websites';

@Injectable()
export class CrawlerService {
  private readonly logger = new Logger(CrawlerService.name);

  public async crawlPage(url: string): Promise<string[]> {
    const website = websites.find((website) => url.includes(website.domain));
    if (!website) {
      throw new Error('Unknown domain');
    }

    this.logger.log(`Crawl URL: ${url}`);
    const html = await website.crawler.getHtml(url);
    return this.parseAds(html, website);
  }

  private async parseAds(html: string, website: Website): Promise<string[]> {
    const $ = cheerio.load(html);

    const links = $(website.linkSelector)
      .get()
      .map((x) => $(x).attr('href'));

    const uniqueLinks = [...new Set(links)];
    return uniqueLinks.map((link) => `${website.domain}${link}`);
  }
}
