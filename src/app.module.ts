import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedditModule } from './reddit/reddit.module';
import { SentimentAnalysisService } from './sentiment/sentiment.service';

@Module({
  imports: [RedditModule],
  controllers: [AppController],
  providers: [AppService, SentimentAnalysisService],
})
export class AppModule {}
