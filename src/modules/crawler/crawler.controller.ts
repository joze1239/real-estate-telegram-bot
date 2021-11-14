import { Controller, Get } from '@nestjs/common';
import { CrawlerService } from './crawler.service';

@Controller('crawler')
export class CrawlerController {
    constructor(private readonly crawlerService: CrawlerService) {}

    @Get()
    getUrlList(): Promise<any> {
        const url =
            'https://www.nepremicnine.net/oglasi-prodaja/podravska/maribor/stanovanje/?s=16';
        return this.crawlerService.getUrlList(url);
    }
}
