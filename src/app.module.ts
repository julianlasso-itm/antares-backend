import { Module } from '@nestjs/common';
import { AssessmentsModule } from './modules';

@Module({
  imports: [AssessmentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
