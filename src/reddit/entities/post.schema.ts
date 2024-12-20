import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  upvotes: number;

  @Prop()
  sentimentMagnitude: number;

  @Prop()
  sentimentScore: number;

  @Prop()
  date: Date;

  @Prop()
  subreddit: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
