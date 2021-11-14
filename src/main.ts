import { NestFactory } from '@nestjs/core';
import { AppModule } from '~app/app.module';

async function bootstrap() {
    console.log(
        'process.env.TELEGRAM_BOT_TOKEN',
        process.env.TELEGRAM_BOT_TOKEN,
    );
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
}
bootstrap();
