import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistence/persistence.module';

@Module({
  imports: [PersistenceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
