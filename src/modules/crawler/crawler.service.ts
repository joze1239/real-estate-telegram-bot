import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import cheerio from 'cheerio';
import { websites } from './websites';

@Injectable()
export class CrawlerService {
  private readonly logger = new Logger(CrawlerService.name);

  public async crawlPage(url: string): Promise<string[]> {
    const website = websites.find((website) => url.includes(website.domain));
    if (!websites) {
      throw new Error('Unknown domain');
    }

    const links = await this.crawlUrlList(url, website.linkSelector);
    const uniqueLinks = [...new Set(links)];
    return uniqueLinks.map((link) => `${website.domain}${link}`);
  }

  private async crawlUrlList(
    url: string,
    elementSelector: string,
  ): Promise<string[]> {
    this.logger.log(`Crawl URL: ${url}`);

    const res = await axios.get(url);
    const $ = cheerio.load(res.data);

    return $(elementSelector)
      .get()
      .map((x) => $(x).attr('href'));
  }
}
