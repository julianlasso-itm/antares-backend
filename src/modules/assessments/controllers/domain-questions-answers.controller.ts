import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ulid } from 'ulid';
import { CrudController, ResponseDto } from '../../../common';
import { DomainQuestionsAnswers } from '../../../common/modules/persistence/entities';
import {
  NewDomainQuestionsAnswersRequestDto,
  UpdateDomainQuestionsAnswersRequestDto,
} from '../dto';
import { DomainQuestionsAnswersService } from '../services/domain-questions-answers.service';

@Controller('domain-questions-answers')
export class DomainQuestionsAnswersController {
  constructor(private readonly service: DomainQuestionsAnswersService) {}

  @Get()
  async findAll(): Promise<ResponseDto<DomainQuestionsAnswers[]>> {
    const data = await this.service.findAll();
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
    newData.domainKnowledgeId = request.domainKnowledgeId;
    newData.domainKnowledgeLevelId = request.domainKnowledgeLevelId;
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
