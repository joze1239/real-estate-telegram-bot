import { Injectable } from '@nestjs/common';
import axios from 'axios';
import cheerio from 'cheerio';

@Injectable()
export class CrawlerService {
    url: string;

    async getUrlList(url: string) {
        const res = await axios.get(url);
        const $ = cheerio.load(res.data);
        return $('.seznam a.slika')
            .get()
            .map((x) => $(x).attr('href'));
    }
}
