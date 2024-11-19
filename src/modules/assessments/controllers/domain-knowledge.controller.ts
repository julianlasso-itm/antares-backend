import { NewDomainKnowledgeDto } from '@assessments/dto/new-domain-knowledge.dto';
import { UpdateDomainKnowledgeDto } from '@assessments/dto/update-domain-knowledge.dto';
import { DomainKnowledgeService } from '@assessments/services/domain-knowledge.service';
import { ResponseDto } from '@common/dto/response.dto';
import { CrudController } from '@common/utils/crud.controller';
import { DomainKnowledge } from '@entities/assessments/domain-knowledge.entity';
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
import { FindAllResponse } from '@repositories/find-all.response';
import { ulid } from 'ulid';

@Controller('domain-knowledge')
export class DomainKnowledgeController {
  constructor(private readonly service: DomainKnowledgeService) {}

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
    @Query('search') search?: string,
    @Query('filter') filter?: string,
  ): Promise<ResponseDto<FindAllResponse<DomainKnowledge>>> {
    const data = await this.service.findAll(
      page,
      size,
      {
        status: 'DESC',
        createdAt: 'ASC',
      },
      ['domain', 'topic'],
      search,
      filter,
    );
    return CrudController.response(data);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<ResponseDto<DomainKnowledge>> {
    const data = await this.service.findOne('domainKnowledgeId', id);
    return CrudController.response(data);
  }

  @Get('completed-assessment/:assessmentId')
  async findAllCompletedAssessment(
    @Param('assessmentId') assessmentId: string,
    @Query('technologyItemId') technologyItemId: string,
  ): Promise<ResponseDto<DomainKnowledge[]>> {
    const data = await this.service.findAllCompletedAssessmentForItemTechnology(
      assessmentId,
      technologyItemId,
    );
    return CrudController.response(data);
  }

  @Post()
  async create(
    @Body() request: NewDomainKnowledgeDto,
  ): Promise<ResponseDto<DomainKnowledge>> {
    const newData = new DomainKnowledge();
    newData.domainKnowledgeId = ulid();
    newData.technologyItemId = request.technologyItemId;
    newData.domain = request.domain;
    if (request.topic) {
      newData.topic = request.topic;
    }
    if (request.weight) {
      newData.weight = request.weight;
    }

    const data = await this.service.create(newData);
    return CrudController.response(data);
  }

  @Put(':id')
  async update(
    @Body() request: UpdateDomainKnowledgeDto,
    @Param('id') id: string,
  ): Promise<ResponseDto<DomainKnowledge>> {
    const update = new DomainKnowledge();
    if (request.technologyItemId) {
      update.technologyItemId = request.technologyItemId;
    }
    if (request.domain) {
      update.domain = request.domain;
    }
    if (request.topic) {
      update.topic = request.topic;
    }
    if (request.weight) {
      update.weight = request.weight;
    }
    if (request.status !== undefined) {
      update.status = request.status;
    }

    const data = await this.service.update('domainKnowledgeId', id, update);
    return CrudController.response(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ResponseDto<boolean>> {
    const data = await this.service.delete('domainKnowledgeId', id);
    return CrudController.response(data);
  }
}
