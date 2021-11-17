import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { TelegrafContext } from '~common/interfaces/telegraf-context.interface';
import { SubscriptionService } from '~modules/subscription/subscription.service';

@Injectable()
export class BotService {
  constructor(
    @InjectBot() private bot: Telegraf<TelegrafContext>,
    private subscriptionService: SubscriptionService,
  ) {}

  sendMessage(chatId: number, message: string): void {
    this.bot.telegram.sendMessage(chatId, message);
  }

  handleError(chatId: number, error: any): void {
    this.sendMessage(chatId, `Error: ${JSON.stringify(error)}`);
  }

  async subscribe(chatId: number, name: string, url: string): Promise<void> {
    try {
      await this.subscriptionService.createSubscription({
        chatId,
        name,
        url,
      });
      this.sendMessage(chatId, `Subscription added`);
    } catch (error) {
      this.handleError(chatId, error);
    }
  }

  async listSubscriptions(chatId: number): Promise<void> {
    try {
      const subscriptions =
        await this.subscriptionService.getSubscriptionsByChatId(chatId);

      if (!subscriptions.length) {
        this.sendMessage(chatId, 'You have no subscriptions!');
        return;
      }

      const message = subscriptions
        .map((s) => `[${s.name}] ${s.url}`)
        .join('\n');
      this.sendMessage(chatId, message);
    } catch (error) {
      this.handleError(chatId, error);
    }
  }
}
