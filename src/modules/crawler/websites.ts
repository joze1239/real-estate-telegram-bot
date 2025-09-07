export interface Website {
  domain: string;
  linkSelector: string;
}

export const websites: Website[] = [
  {
    domain: 'https://www.nepremicnine.net',
    linkSelector: '.property-box a.url-title-d',
  },
  {
    domain: 'https://www.bolha.com',
    linkSelector: '.content-main .EntityList--Regular .EntityList-item a.link',
  },
];
