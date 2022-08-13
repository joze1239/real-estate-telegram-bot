import { Injectable } from '@nestjs/common';
import axios from 'axios';
import cheerio from 'cheerio';
import randUserAgent from 'rand-user-agent';
import { websites } from './websites';

@Injectable()
export class CrawlerService {
  // constructor() {
  //   this.test();
  // }

  // public async test() {
  //   const links = await this.crawlPage(
  //     'https://www.avto.net/Ads/results_100.asp?oglasrubrika=1&prodajalec=2',
  //   );
  //   console.log({ links });
  // }

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
    const userAgent = randUserAgent('desktop');
    const headers = {
      'user-agent': userAgent,
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
