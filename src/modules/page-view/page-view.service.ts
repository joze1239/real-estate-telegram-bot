import { Injectable } from '@nestjs/common';
import { CreatePageViewDto } from './dto/page-view.create.dto';
import PageView from './page-view.entity';
import { PageViewRepository } from './page-view.repository';

@Injectable()
export class PageViewService {
  constructor(private readonly pageViewRepository: PageViewRepository) {}

  async getViewedPages(chatId: number, urls: string[]): Promise<PageView[]> {
    return await this.pageViewRepository.getViewedPages(chatId, urls);
  }

  async createPageViews(pageViews: CreatePageViewDto[]): Promise<PageView[]> {
    return this.pageViewRepository.save(
      this.pageViewRepository.create(pageViews),
    );
  }
}
