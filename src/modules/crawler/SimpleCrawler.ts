import axios from 'axios';
import { Crawler } from './Crawler';

export class SimpleCrawler extends Crawler {
  async getHtml(url: string): Promise<string> {
    const response = await axios.get(url);
    return response.data;
  }
}
