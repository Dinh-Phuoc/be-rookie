import { IsIn, IsOptional, IsString } from 'class-validator';
import type { FlashcardDifficulty } from '../interfaces/flashcard.interface';

export class FindFlashcardsDto {
    @IsOptional()
    @IsString()
    topicSlug?: string;

    @IsOptional()
    @IsIn(['basic', 'intermediate', 'advanced'])
    difficulty?: FlashcardDifficulty;
}
