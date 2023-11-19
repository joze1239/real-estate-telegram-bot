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

    const res = await axios.get(url, {
      headers: {
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
        'accept-language': 'en-GB,en;q=0.9,sl-SI;q=0.8,sl;q=0.7,hu;q=0.6',
      },
    });
    const $ = cheerio.load(res.data);

    return $(elementSelector)
      .get()
      .map((x) => $(x).attr('href'));
  }
}
