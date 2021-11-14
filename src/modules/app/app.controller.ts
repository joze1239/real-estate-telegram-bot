import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiStatusDto } from './dto/api-status.dto';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getStatus(): Promise<ApiStatusDto> {
        return this.appService.getStatus();
    }
}
