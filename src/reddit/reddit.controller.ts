import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import { RedditService } from './reddit.service';
import { CreateRedditDto } from './dto/create-snapshot.dto';

@Controller('reddit')
export class RedditController {
  constructor(private readonly redditService: RedditService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createRedditDto: CreateRedditDto) {
    return this.redditService.create(createRedditDto);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.redditService.findAll();
  }
}
