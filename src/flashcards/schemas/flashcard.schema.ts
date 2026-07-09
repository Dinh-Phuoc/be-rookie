import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

class CodeExample {
  @Prop({ required: true })
  language: string;

  @Prop({ required: true })
  code: string;

  @Prop()
  title?: string;
}

class PainPoint {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  consequence?: string;
}

export type FlashcardDocument = HydratedDocument<Flashcard>;

@Schema({ timestamps: true, collection: 'flashcards' })
export class Flashcard {
  @Prop({ required: true, index: true })
  topicSlug: string;

  @Prop({ required: true, index: true })
  slug: string;

  @Prop({ required: true })
  question: string;

  @Prop({ required: true })
  answer: string;

  @Prop({ enum: ['basic', 'intermediate', 'advanced'], default: 'basic' })
  difficulty: 'basic' | 'intermediate' | 'advanced';

  @Prop({ type: [CodeExample], default: [] })
  codeExamples: CodeExample[];

  @Prop({ type: [PainPoint], default: [] })
  painPoints: PainPoint[];

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ default: true, index: true })
  isPublished: boolean;
}

export const FlashcardSchema = SchemaFactory.createForClass(Flashcard);
FlashcardSchema.index({ topicSlug: 1, slug: 1 }, { unique: true });
