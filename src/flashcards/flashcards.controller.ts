import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { FindFlashcardsDto } from './dto/find-flashcards.dto';
import { FlashcardsService } from './flashcards.service';

@Controller()
export class FlashcardsController {
  constructor(private readonly flashcardsService: FlashcardsService) {}

  @Get('topics')
  async findTopics() {
    const data = await this.flashcardsService.findTopics();

    return {
      code: 'SUCCESS',
      message: 'Lay danh sach chu de thanh cong.',
      data,
    };
  }

  @Get('flashcards')
  async findFlashcards(@Query() query: FindFlashcardsDto) {
    const data = await this.flashcardsService.findFlashcards(query);

    return {
      code: 'SUCCESS',
      message: 'Lay danh sach flashcard thanh cong.',
      data,
    };
  }

  @Get('flashcards/:topicSlug/:cardSlug')
  async findFlashcardDetail(
    @Param('topicSlug') topicSlug: string,
    @Param('cardSlug') cardSlug: string,
  ) {
    const data = await this.flashcardsService.findFlashcardDetail(
      topicSlug,
      cardSlug,
    );

    if (!data) {
      throw new NotFoundException('Khong tim thay flashcard.');
    }

    return {
      code: 'SUCCESS',
      message: 'Lay chi tiet flashcard thanh cong.',
      data,
    };
  }
}
