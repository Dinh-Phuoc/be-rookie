import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TopicDocument = HydratedDocument<Topic>;

@Schema({ timestamps: true, collection: 'topics' })
export class Topic {
  @Prop({ required: true, unique: true, index: true })
  slug: string;

  @Prop({ required: true })
  title: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: true, index: true })
  isPublished: boolean;
}

export const TopicSchema = SchemaFactory.createForClass(Topic);
