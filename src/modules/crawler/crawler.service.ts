import { Injectable } from '@nestjs/common';
import axios from 'axios';
import cheerio from 'cheerio';
import { websites } from './websites';

@Injectable()
export class CrawlerService {
  public async crawlPage(url: string): Promise<string[]> {
    const website = websites.find((website) => url.includes(website.domain));
    if (!websites) {
      throw new Error('Unknown domain');
    }

    let links = await this.crawlUrlList(url, website.linkSelector);

    // Resolve relative paths
    links = links.map((link) =>
      link.startsWith('../') ? link.substring(2) : link,
    );

    const uniqueLinks = [...new Set(links)];
    return uniqueLinks.map((link) => `${website.domain}${link}`);
  }

  private async crawlUrlList(
    url: string,
    elementSelector: string,
  ): Promise<string[]> {
    const headers = {
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
      'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
    };
    const res = await axios.get(url, {
      headers,
    });

    const $ = cheerio.load(res.data);
    return $(elementSelector)
      .get()
      .map((x) => $(x).attr('href'));
  }
}
