import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ulid } from 'ulid';
import { CrudController, ResponseDto } from '../../../common';
import { FindAllResponse } from '../../../common/modules/persistence';
import { DomainQuestionsAnswers } from '../../../common/modules/persistence/entities';
import {
  NewDomainQuestionsAnswersRequestDto,
  UpdateDomainQuestionsAnswersRequestDto,
} from '../dto';
import { DomainQuestionsAnswersService } from '../services';

@Controller('domain-questions-answers')
export class DomainQuestionsAnswersController {
  constructor(private readonly service: DomainQuestionsAnswersService) {}

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
    @Query('search') search?: string,
  ): Promise<ResponseDto<FindAllResponse<DomainQuestionsAnswers>>> {
    const data = await this.service.findAll(
      page,
      size,
      {
        status: 'DESC',
        createdAt: 'ASC',
      },
      ['question', 'answer'],
      search,
    );
    return CrudController.response(data);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<ResponseDto<DomainQuestionsAnswers>> {
    const data = await this.service.findOne('domainQuestionAnswerId', id);
    return CrudController.response(data);
  }

  @Post()
  async create(
    @Body() request: NewDomainQuestionsAnswersRequestDto,
  ): Promise<ResponseDto<DomainQuestionsAnswers>> {
    const newData = new DomainQuestionsAnswers();
    newData.domainQuestionAnswerId = ulid();

    // Lógica para determinar cuál valor registrar
    if (
      request.domainKnowledgeId &&
      (!request.domainKnowledgeLevelId ||
        request.domainKnowledgeLevelId.length === 0)
    ) {
      newData.domainKnowledgeId = request.domainKnowledgeId;
    } else if (request.domainKnowledgeLevelId) {
      newData.domainKnowledgeLevelId = request.domainKnowledgeLevelId;
    }

    newData.question = request.question;
    newData.answer = request.answer;

    const data = await this.service.create(newData);
    return CrudController.response(data);
  }

  @Put(':id')
  async update(
    @Body() request: UpdateDomainQuestionsAnswersRequestDto,
    @Param('id') id: string,
  ): Promise<ResponseDto<DomainQuestionsAnswers>> {
    const update = new DomainQuestionsAnswers();

    if (
      request.domainKnowledgeId &&
      (!request.domainKnowledgeLevelId ||
        request.domainKnowledgeLevelId.length === 0)
    ) {
      update.domainKnowledgeId = request.domainKnowledgeId;
      update.domainKnowledgeLevelId = null;
    } else if (request.domainKnowledgeLevelId) {
      update.domainKnowledgeLevelId = request.domainKnowledgeLevelId;
    }

    if (request.question) {
      update.question = request.question;
    }
    if (request.answer) {
      update.answer = request.answer;
    }
    if (request.status !== undefined) {
      update.status = request.status;
    }

    const data = await this.service.update(
      'domainQuestionAnswerId',
      id,
      update,
    );
    return CrudController.response(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ResponseDto<boolean>> {
    const data = await this.service.delete('domainQuestionAnswerId', id);
    return CrudController.response(data);
  }
}
