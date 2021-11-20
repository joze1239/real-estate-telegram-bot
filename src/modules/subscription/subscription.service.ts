import { Injectable } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { CrawlerService } from '~modules/crawler/crawler.service';
import { CreatePageViewDto } from '~modules/page-view/dto/page-view.create.dto';
import { PageViewService } from '~modules/page-view/page-view.service';
import { CreateSubscriptionDto } from './dto/subscription.create.dto';
import { RemoveSubscriptionDto } from './dto/subscription.remove.dto';
import Subscription from './subscription.entity';
import { SubscriptionRepository } from './subscription.repository';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
    private readonly pageViewService: PageViewService,
    private readonly crawlerService: CrawlerService,
  ) {}

  async getSubscriptionsByChatId(chatId: number): Promise<Subscription[]> {
    return await this.subscriptionRepository.getSubscriptionsByChatId(chatId);
  }

  async getAllSubscriptions(): Promise<Subscription[]> {
    return await this.subscriptionRepository.find({
      withDeleted: false,
    });
  }

  async createSubscription(
    subscriptionDto: CreateSubscriptionDto,
  ): Promise<Subscription> {
    await validateOrReject(subscriptionDto);
    const subscription = await this.subscriptionRepository.createSubscription(
      subscriptionDto,
    );
    await this.crawlSubscriptionPage(subscription.id);
    return subscription;
  }

  async removeSubscription(
    subscriptionDto: RemoveSubscriptionDto,
  ): Promise<Subscription> {
    await validateOrReject(subscriptionDto);
    return await this.subscriptionRepository.removeSubscription(
      subscriptionDto,
    );
  }

  async crawlSubscriptionPage(id: number): Promise<string[]> {
    const subscription = await this.subscriptionRepository.getSubscriptionsById(
      id,
    );
    const crawledUrls = await this.crawlerService.crawlPage(subscription.url);
    console.log(crawledUrls);

    const currentPageViews = await this.pageViewService.getViewedPages(
      subscription.chatId,
      crawledUrls,
    );
    const currentUrls = currentPageViews.map((pageView) => pageView.url);
    const urls = crawledUrls.filter((url) => !currentUrls.includes(url));
    console.log(urls);

    const createPageViews = urls.map(
      (url) => new CreatePageViewDto(subscription.chatId, url),
    );
    await this.pageViewService.createPageViews(createPageViews);

    return urls;
  }
}
