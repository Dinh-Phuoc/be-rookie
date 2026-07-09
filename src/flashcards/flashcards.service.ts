import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FindFlashcardsDto } from './dto/find-flashcards.dto';
import { Flashcard, FlashcardDocument } from './schemas/flashcard.schema';
import { Topic, TopicDocument } from './schemas/topic.schema';
import { INITIAL_FLASHCARDS, INITIAL_TOPICS } from './seed/initial-data';

@Injectable()
export class FlashcardsService implements OnModuleInit {
    constructor(
        @InjectModel(Flashcard.name)
        private readonly flashcardModel: Model<FlashcardDocument>,
        @InjectModel(Topic.name)
        private readonly topicModel: Model<TopicDocument>,
    ) {}

    async onModuleInit(): Promise<void> {
        await this.seedIfEmpty();
    }

    async seedIfEmpty(): Promise<void> {
        const totalTopics = await this.topicModel.countDocuments();
        const totalFlashcards = await this.flashcardModel.countDocuments();

        if (totalTopics > 0 || totalFlashcards > 0) {
            return;
        }

        await this.topicModel.insertMany(INITIAL_TOPICS);
        await this.flashcardModel.insertMany(INITIAL_FLASHCARDS);
    }

    async findTopics() {
        const topics = await this.topicModel
            .find({ isPublished: true })
            .sort({ order: 1 })
            .lean()
            .exec();

        return {
            items: topics,
            total: topics.length,
        };
    }

    async findFlashcards(query: FindFlashcardsDto) {
        const filter: Record<string, unknown> = { isPublished: true };

        if (query.topicSlug) {
            filter.topicSlug = query.topicSlug;
        }

        if (query.difficulty) {
            filter.difficulty = query.difficulty;
        }

        const items = await this.flashcardModel.find(filter).sort({ createdAt: -1 }).lean().exec();

        return {
            items,
            total: items.length,
        };
    }

    async findFlashcardDetail(topicSlug: string, cardSlug: string) {
        return this.flashcardModel
            .findOne({
                topicSlug,
                slug: cardSlug,
                isPublished: true,
            })
            .lean()
            .exec();
    }
}
