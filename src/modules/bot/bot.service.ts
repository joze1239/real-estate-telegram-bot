import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import PromisePool from '@supercharge/promise-pool/dist';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { User as TelegrafUser } from 'telegraf/typings/core/types/typegram';
import { TelegrafContext } from '~common/interfaces/telegraf-context.interface';
import { CreateSubscriptionDto } from '~modules/subscription/dto/subscription.create.dto';
import { RemoveSubscriptionDto } from '~modules/subscription/dto/subscription.remove.dto';
import { SubscriptionService } from '~modules/subscription/subscription.service';
import { CreateUserDto } from '~modules/user/user.create.dto';
import { UserService } from '~modules/user/user.service';
import { sleep } from '~utils/sleep';

@Injectable()
export class BotService {
  private readonly logger = new Logger(BotService.name);

  constructor(
    @InjectBot() private bot: Telegraf<TelegrafContext>,
    private subscriptionService: SubscriptionService,
    private userService: UserService,
  ) {}

  async sendMessage(chatId: number, message: string): Promise<void> {
    await this.bot.telegram.sendMessage(chatId, message);
  }

  async sendMessages(chatId: number, messages: string[]): Promise<void> {
    // Telegram has rate limit of max 30 messages per second, but we don't want to hit the rate limit so we do 10 per second
    await PromisePool.withConcurrency(10)
      .for(messages)
      .process(async (message) => {
        await this.sendMessage(chatId, message);
        sleep(1000);
      });
  }

  async handleError(chatId: number, error: any): Promise<void> {
    const message = error?.message || JSON.stringify(error);
    await this.sendMessage(chatId, `Error: ${message}`);
  }

  async subscribe(
    chatId: number,
    telegrafUser: TelegrafUser,
    name: string,
    url: string,
  ): Promise<void> {
    try {
      const userDto = new CreateUserDto(
        telegrafUser.id,
        telegrafUser.username,
        telegrafUser.first_name,
        telegrafUser.last_name,
      );
      const user = await this.userService.findOrCreate(userDto);

      const subscriptionDto = new CreateSubscriptionDto(
        chatId,
        user.id,
        name,
        url,
      );
      await this.subscriptionService.createSubscription(subscriptionDto);

      await this.sendMessage(chatId, `Subscription added`);
    } catch (error) {
      await this.handleError(chatId, error);
    }
  }

  async unsubscribe(chatId: number, name: string): Promise<void> {
    try {
      const dto = new RemoveSubscriptionDto(chatId, name);
      await this.subscriptionService.removeSubscription(dto);

      await this.sendMessage(chatId, `Subscription removed`);
    } catch (error) {
      await this.handleError(chatId, error);
    }
  }

  async listSubscriptions(chatId: number): Promise<void> {
    try {
      const subscriptions =
        await this.subscriptionService.getSubscriptionsByChatId(chatId);

      if (!subscriptions.length) {
        await this.sendMessage(chatId, 'You have no subscriptions!');
        return;
      }

      const message = subscriptions
        .map((s) => `[${s.name}] ${s.url}`)
        .join('\n');
      await this.sendMessage(chatId, message);
    } catch (error) {
      await this.handleError(chatId, error);
    }
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  async crawlNewPages() {
    const subscriptions = await this.subscriptionService.getAllSubscriptions();
    for (const subscription of subscriptions) {
      try {
        const newUrls = await this.subscriptionService.crawlSubscriptionPage(
          subscription.id,
        );
        this.logger.log('Crawl pages', {
          extra: {
            subscription_url: subscription.url,
            urls: newUrls,
          },
        });
        const messages = newUrls.map((url) => `[${subscription.name}] ${url}`);
        await this.sendMessages(subscription.chatId, messages);
      } catch (error) {
        this.logger.error(error.message);
      }
    }
  }
}
