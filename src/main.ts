import { NestFactory } from '@nestjs/core';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { AppModule } from '~modules/app/app.module';

async function bootstrap() {
  puppeteer.use(StealthPlugin());
  await NestFactory.createApplicationContext(AppModule);
}
bootstrap();
