import axios from 'axios';
import { Crawler } from './Crawler';

export class ProxyCrawler extends Crawler {
  async getHtml(url: string): Promise<string> {
    const response = await axios.post(
      'https://api.brightdata.com/request',
      {
        url,
        zone: process.env.BRIGHT_DATA_ZONE,
        format: 'raw',
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.BRIGHT_DATA_API_TOKEN}`,
        },
      },
    );

    return response.data;
  }
}
