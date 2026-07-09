export type FlashcardDifficulty = 'basic' | 'intermediate' | 'advanced';

export interface CodeExampleItem {
    language: string;
    code: string;
    title?: string;
}

export interface PainPointItem {
    title: string;
    description: string;
    consequence?: string;
}
