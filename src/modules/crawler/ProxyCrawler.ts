import axios from 'axios';
import { Crawler } from './Crawler';

export class ProxyCrawler extends Crawler {
  async getHtml(url: string): Promise<string> {
    const response = await axios.post('https://api.brightdata.com/request', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.BRIGHT_DATA_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
        zone: process.env.BRIGHT_DATA_ZONE,
        format: 'raw',
      }),
    });

    return response.data;
  }
}
