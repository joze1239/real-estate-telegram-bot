import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotModule } from '~modules/bot/bot.module';
import { PageViewModule } from '~modules/page-view/page-view.module';
import { SubscriptionModule } from '~modules/subscription/subscription.module';
import { UserModule } from '~modules/user/user.module';
import { typeOrmConfigFactory, TYPEORM_CONFIG } from './typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
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
    SubscriptionModule,
    PageViewModule,
    BotModule,
    UserModule,
  ],
})
export class AppModule {}
