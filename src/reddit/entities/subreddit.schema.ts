import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SubredditDocument = HydratedDocument<Subreddit>;

@Schema()
export class Subreddit {
  @Prop()
  title: string;
}

export const SubredditSchema = SchemaFactory.createForClass(Subreddit);
