import { Injectable, Logger } from '@nestjs/common';
import cheerio from 'cheerio';
import { execSync } from 'child_process';
import puppeteer from 'rebrowser-puppeteer';

import { sleep } from '~utils/sleep';
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
    const html = await this.getPageHtml(url);
    const $ = cheerio.load(html);

    return $(elementSelector)
      .get()
      .map((x) => $(x).attr('href'));
  }

  private async getPageHtml(url: string) {
    try {
      const chromium1 = execSync('which chromium').toString().trim();
      const chromium2 = execSync('which chromium-browser').toString().trim();
      const chromium3 = execSync('ls -l /usr/bin | grep chromium')
        .toString()
        .trim();

      this.logger.log('which chromium:', { extra: chromium1 });
      this.logger.log('which chromium-browser:', { extra: chromium2 });
      this.logger.log('ls /usr/bin | grep chromium:\n', { extra: chromium3 });
    } catch (err) {
      this.logger.error(`Error checking chromium paths ${err.message}`);
    }

    const browser = await puppeteer.launch({
      headless: true,
      executablePath: '/usr/bin/chromium-browser',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    let html = '';
    for (let i = 0; i < 3; i++) {
      try {
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });
        html = await page.content();
        break;
      } catch (e) {
        // sometimes puppeteer timeouts in docker container so we have to retry to make it more reliable
        if (i === 2) {
          await browser.close();
          throw e;
        }
        this.logger.warn('An error occurred getting data, retrying in 1s...', {
          extra: {
            url,
          },
        });
        await sleep(2000);
      }
    }
    await browser.close();

    return html;
  }
}
