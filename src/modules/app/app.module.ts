import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotModule } from '~modules/bot/bot.module';
import { typeOrmConfigFactory, TYPEORM_CONFIG } from './typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TelegrafModule.forRoot({
      token: process.env.TELEGRAM_BOT_TOKEN,
      include: [BotModule],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(typeOrmConfigFactory)],
      useFactory: (config: TypeOrmModuleOptions) => {
        return config;
      },
      inject: [TYPEORM_CONFIG],
    }),
    BotModule,
  ],
})
export class AppModule {}
