import { Injectable } from '@nestjs/common';

@Injectable()
export class CrawlerService {
    url: string;

    constructor() {
        this.url =
            'https://www.nepremicnine.net/oglasi-prodaja/podravska/maribor/stanovanje/?s=16';
    }

    getUrlList() {}
}
