import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '~modules/app/app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    const PORT = configService.get<number>('PORT') || 3000;
    await app.listen(PORT);
}
bootstrap();
