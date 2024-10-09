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
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { ulid } from 'ulid';
import { CrudController, ResponseDto } from '../../../common';
import { FindAllResponse } from '../../../common/modules/persistence';
import { DomainQuestionsAnswers } from '../../../common/modules/persistence/entities';
import {
  NewDomainQuestionsAnswersRequestDto,
  UpdateDomainQuestionsAnswersRequestDto,
} from '../dto';
import { DomainQuestionsAnswersService } from '../services';

@ApiTags('assessments')
@Controller('domain-questions-answers')
export class DomainQuestionsAnswersController {
  constructor(private readonly service: DomainQuestionsAnswersService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todas las preguntas y respuestas' })
  @ApiTags('assessments')
  @ApiResponse({
    status: 200,
    description: 'Lista de preguntas y respuestas',
    content: {
      'application/json': {
        schema: {
          allOf: [
            { $ref: getSchemaPath(ResponseDto) },
            {
              properties: {
                value: {
                  type: 'array',
                  items: { $ref: getSchemaPath(DomainQuestionsAnswers) },
                },
              },
            },
          ],
        },
        examples: {
          withData: {
            summary: 'Salida con datos',
            value: {
              value: [
                {
                  domainKnowledgeId: '01J8XM2FC49N58RTHH671GPFVV',
                  domainKnowledgeLevelId: '01J8XM2FC49N58RTHH671GPFVV',
                  question: '¿Cuál es el lenguaje de programación más popular?',
                  answer:
                    'Sin duda, PHP es un lenguaje de programación más popular',
                  status: true,
                  createdAt: '2023-03-30T12:00:00.000Z',
                  updatedAt: null,
                  deletedAt: null,
                },
              ],
            },
          },
          withoutData: {
            summary: 'Salida sin datos',
            value: { value: [] },
          },
        },
      },
    },
  })
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
    if (request.domainKnowledgeId && request.domainKnowledgeLevelId === null) {
      newData.domainKnowledgeId = request.domainKnowledgeId;
    }
    if (request.domainKnowledgeLevelId && request.domainKnowledgeId === null) {
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
