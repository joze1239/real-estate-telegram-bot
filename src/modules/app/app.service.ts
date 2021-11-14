import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiStatusDto } from './dto/api-status.dto';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  async getStatus(): Promise<ApiStatusDto> {
    return {
      environment: this.configService.get<string>('STAGE'),
    };
  }
}
