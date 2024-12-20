import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RedditService } from './reddit.service';
import { CreateRedditDto } from './dto/create-snapshot.dto';

@Controller('reddit')
export class RedditController {
  constructor(private readonly redditService: RedditService) {}

  @Post()
  create(@Body() createRedditDto: CreateRedditDto) {
    return this.redditService.create(createRedditDto);
  }

  @Get()
  findAll() {
    return this.redditService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.redditService.findOne(+id);
  }
}
