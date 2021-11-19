import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import PageView from './page-view.entity';

@EntityRepository(PageView)
export class PageViewRepository extends BaseRepository<PageView> {
  async getViewedPages(chatId: number, urls: string[]): Promise<PageView[]> {
    return await this.createQueryBuilder('pageview')
      .where('pageview.chatId = :chatId', { chatId })
      .andWhere('pageview.url IN (:...urls)', { urls })
      .andWhere('pageview.deleted_at IS NULL')
      .getMany();
  }
}
