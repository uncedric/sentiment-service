import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Max, MinLength } from 'class-validator';

export class CreateRedditDto {
  @ApiProperty({ example: 'MentalHealthSupport' })
  @IsNotEmpty()
  @MinLength(2, {
    message: 'Slug is too short',
  })
  @Max(100, {
    message: 'Slug is too long',
  })
  subreddit: string;
}
