import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FlashcardsController } from './flashcards.controller';
import { FlashcardsService } from './flashcards.service';
import { Flashcard, FlashcardSchema } from './schemas/flashcard.schema';
import { Topic, TopicSchema } from './schemas/topic.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Topic.name, schema: TopicSchema },
            { name: Flashcard.name, schema: FlashcardSchema },
        ]),
    ],
    controllers: [FlashcardsController],
    providers: [FlashcardsService],
    exports: [FlashcardsService],
})
export class FlashcardsModule {}
