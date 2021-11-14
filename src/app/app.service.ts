import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
    constructor(private configService: ConfigService) {}

    async getStatus(): Promise<any> {
        return {
            environment: this.configService.get<string>('STAGE'),
        };
    }
}
