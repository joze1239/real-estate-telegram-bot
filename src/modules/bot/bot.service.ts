import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { TelegrafContext } from '~common/interfaces/telegraf-context.interface';
import { CreateSubscriptionDto } from '~modules/subscription/dto/subscription.create.dto';
import { RemoveSubscriptionDto } from '~modules/subscription/dto/subscription.remove.dto';
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
    const message = error?.message || JSON.stringify(error);
    this.sendMessage(chatId, `Error: ${message}`);
  }

  async subscribe(chatId: number, name: string, url: string): Promise<void> {
    try {
      // const dto = {
      //   chatId,
      //   name,
      //   url,
      // } as CreateSubscriptionDto;
      let dto = new CreateSubscriptionDto();
      dto.chatId = chatId;
      dto.name = name;
      dto.url = url;
      await this.subscriptionService.createSubscription(dto);
      this.sendMessage(chatId, `Subscription added`);
    } catch (error) {
      this.handleError(chatId, error);
    }
  }

  async unsubscribe(chatId: number, name: string): Promise<void> {
    try {
      const dto = {
        chatId,
        name,
      } as RemoveSubscriptionDto;
      await this.subscriptionService.removeSubscription(dto);
      this.sendMessage(chatId, `Subscription removed`);
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
