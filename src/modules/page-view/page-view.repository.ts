import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import PageView from './page-view.entity';

@EntityRepository(PageView)
export class PageViewRepository extends BaseRepository<PageView> {
  async getViewedPages(chatId: number, urls: string[]): Promise<PageView[]> {
    return await this.createQueryBuilder('page_view')
      .where('page_view.chatId = :chatId', { chatId })
      .andWhere('page_view.url IN (:...urls)', { urls })
      .andWhere('page_view.deleted_at IS NULL')
      .getMany();
  }
}
