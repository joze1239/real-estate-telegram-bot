import { Crawler } from './Crawler';
import { ProxyCrawler } from './ProxyCrawler';
import { SimpleCrawler } from './SimpleCrawler';

export interface Website {
  domain: string;
  linkSelector: string;
  crawler: Crawler;
}

export const websites: Website[] = [
  {
    domain: 'https://www.nepremicnine.net',
    linkSelector: '.property-box a.url-title-d',
    crawler: new ProxyCrawler(),
  },
  {
    domain: 'https://www.bolha.com',
    linkSelector: '.content-main .EntityList--Regular .EntityList-item a.link',
    crawler: new SimpleCrawler(),
  },
];
