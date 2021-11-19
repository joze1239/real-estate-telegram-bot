import { Module } from '@nestjs/common';
import { PageViewService } from './page-view.service';

@Module({
  providers: [PageViewService],
  exports: [PageViewService],
})
export class PageViewModule {}
