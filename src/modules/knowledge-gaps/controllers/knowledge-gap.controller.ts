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
import { KnowledgeGaps } from '../../../common/modules/persistence/entities';
import {
  NewKnowledgeGapRequestDto,
  UpdateKnowledgeGapRequestDto,
} from '../dto';
import { KnowledgeGapsService } from '../services';

@Controller('gaps')
export class KnowledgeGapsController {
  constructor(private readonly service: KnowledgeGapsService) {}

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
    @Query('search') search?: string,
  ): Promise<ResponseDto<FindAllResponse<KnowledgeGaps>>> {
    const data = await this.service.findAll(
      page,
      size,
      {
        status: 'DESC',
        createdAt: 'ASC',
      },
      ['observation'],
      search,
    );
    return CrudController.response(data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseDto<KnowledgeGaps>> {
    const data = await this.service.findOne('knowledgeGapId', id);
    return CrudController.response(data);
  }

  @Post()
  async create(
    @Body() request: NewKnowledgeGapRequestDto,
  ): Promise<ResponseDto<KnowledgeGaps>> {
    const newData = new KnowledgeGaps();
    newData.knowledgeGapId = ulid();
    newData.assessmentId = request.assessmentId;
    newData.domainKnowledgeId = request.domainKnowledgeId;
    newData.observation = request.observation;

    const data = await this.service.create(newData);
    return CrudController.response(data);
  }

  @Put(':id')
  async update(
    @Body() request: UpdateKnowledgeGapRequestDto,
    @Param('id') id: string,
  ): Promise<ResponseDto<KnowledgeGaps>> {
    const update = new KnowledgeGaps();
    if (request.observation) {
      update.observation = request.observation;
    }
    if (request.status !== undefined) {
      update.status = request.status;
    }

    const data = await this.service.update('knowledgeGapId', id, update);
    return CrudController.response(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ResponseDto<boolean>> {
    const data = await this.service.delete('knowledgeGapId', id);
    return CrudController.response(data);
  }
}
