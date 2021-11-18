import { Injectable } from '@nestjs/common';
import PromisePool from '@supercharge/promise-pool/dist';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { TelegrafContext } from '~common/interfaces/telegraf-context.interface';
import { CrawlerService } from '~modules/crawler/crawler.service';
import { CreateSubscriptionDto } from '~modules/subscription/dto/subscription.create.dto';
import { RemoveSubscriptionDto } from '~modules/subscription/dto/subscription.remove.dto';
import { SubscriptionService } from '~modules/subscription/subscription.service';

@Injectable()
export class BotService {
  constructor(
    @InjectBot() private bot: Telegraf<TelegrafContext>,
    private subscriptionService: SubscriptionService,
    private crawlerService: CrawlerService,
  ) {}

  async sendMessage(chatId: number, message: string): Promise<void> {
    await this.bot.telegram.sendMessage(chatId, message);
  }

  async sendMessages(chatId: number, messages: string[]): Promise<void> {
    await PromisePool.withConcurrency(10)
      .for(messages)
      .process(async (message) => {
        await this.sendMessage(chatId, message);
      });
  }

  async handleError(chatId: number, error: any): Promise<void> {
    const message = error?.message || JSON.stringify(error);
    await this.sendMessage(chatId, `Error: ${message}`);
  }

  async subscribe(chatId: number, name: string, url: string): Promise<void> {
    try {
      const dto = new CreateSubscriptionDto(chatId, name, url);
      await this.subscriptionService.createSubscription(dto);

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

  async listNewRealEstates(chatId: number) {
    try {
      const subscriptions =
        await this.subscriptionService.getSubscriptionsByChatId(chatId);
      for (const subscription of subscriptions) {
        const links = await this.crawlerService.getRealEstateLinks(
          subscription.url,
        );
        const messages = links.map((link) => `[${subscription.name}] ${link}`);
        await this.sendMessages(chatId, messages);
      }
    } catch (error) {
      this.handleError(chatId, error);
    }
  }
}
