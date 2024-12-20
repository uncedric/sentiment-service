import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRedditDto } from './dto/create-snapshot.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './entities/post.schema';
import axios from 'axios';
import { log } from 'console';
import { SentimentAnalysisService } from 'src/sentiment/sentiment.service';

@Injectable()
export class RedditService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    private sentimentService: SentimentAnalysisService,
  ) {}

  private POSTS_LIMIT = process.env.POSTS_LIMIT || 5;

  async getSubredditPosts(subreddit: string) {
    // get posts from subbreddit
    const redditApi = `https://api.reddit.com/r/${subreddit}/top.json?sort=new&t=day&limit=${this.POSTS_LIMIT}`;
    try {
      const result = await axios.get(redditApi);

      // given more time we could use a more robust type or the reddit SDK
      return result?.data?.data?.children;
    } catch (error) {
      console.error(
        'ERROR:',
        error.response ? error.response.data : error.message,
      );
      throw new HttpException(
        'Failed to fetch subreddit posts',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(createRedditDto: CreateRedditDto) {
    log('-------------------------createRedditDto', createRedditDto);
    // get posts from subbreddit
    const posts = await this.getSubredditPosts(createRedditDto.subreddit);
    for (const post of posts) {
      log('post ', post.data.title);
      const analysisResult = await this.sentimentService.analyzeSentiment(
        post?.data?.title,
      );
      const newPost = new this.postModel({
        title: post.data.title,
        subreddit: createRedditDto.subreddit,
        sentimentScore: analysisResult.score,
        sentimentMagnitude: analysisResult.magnitude,
      });
      log('New Post', newPost);
      this.postModel.create(newPost);
    }

    // return immediately a response, let the process run in the background to avoid blocking the request
    return `Analysis for subreddit ${createRedditDto.subreddit} has started`;
  }

  async findAll() {
    const posts = await this.postModel.find().sort('-sentimentScore').exec();
    return posts;
  }

  findOne(id: number) {
    return `This action returns a #${id} reddit`;
  }
}
