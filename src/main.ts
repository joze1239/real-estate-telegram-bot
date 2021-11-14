import { NestFactory } from '@nestjs/core';
import { AppModule } from '~modules/app/app.module';

async function bootstrap() {
    await NestFactory.createApplicationContext(AppModule);
}
bootstrap();
