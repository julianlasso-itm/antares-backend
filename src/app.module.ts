import { Module } from '@nestjs/common';
import { AssessmentsModule, HumanResourcesModule } from './modules';

@Module({
  imports: [AssessmentsModule, HumanResourcesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
