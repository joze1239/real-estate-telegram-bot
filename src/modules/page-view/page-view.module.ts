import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import PageView from './page-view.entity';
import { PageViewRepository } from './page-view.repository';
import { PageViewService } from './page-view.service';

@Module({
  imports: [TypeOrmModule.forFeature([PageView, PageViewRepository])],
  providers: [PageViewService],
  exports: [PageViewService],
})
export class PageViewModule {}
