import { Module } from '@nestjs/common';
import { RedditService } from './reddit.service';
import { RedditController } from './reddit.controller';
import { PostSchema } from './entities/post.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { SentimentAnalysisService } from 'src/sentiment/sentiment.service';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://mongodb:27017/sentiment-db'),
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }]),
  ],
  controllers: [RedditController],
  providers: [RedditService, SentimentAnalysisService],
})
export class RedditModule {}
