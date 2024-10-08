import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource, entities, repositories } from './data.source';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSource),
    TypeOrmModule.forFeature(entities),
  ],
  controllers: [],
  providers: repositories,
  exports: repositories,
})
export class PersistenceModule {}
