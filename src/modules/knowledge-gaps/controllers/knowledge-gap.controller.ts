import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ulid } from 'ulid';
import { CrudController, ResponseDto } from '../../../common';
import { KnowledgeGaps } from '../../../common/modules/persistence/entities';
import {
  NewKnowledgeGapRequestDto,
  UpdateKnowledgeGapRequestDto,
} from '../dto';
import { KnowledgeGapsService } from '../services';

@ApiTags('knowledge-gaps')
@Controller('gaps')
export class KnowledgeGapsController {
  constructor(private readonly service: KnowledgeGapsService) {}

  @Get()
  async findAll(): Promise<ResponseDto<KnowledgeGaps[]>> {
    const data = await this.service.findAll();
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
