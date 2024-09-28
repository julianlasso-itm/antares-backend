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
import { DomainKnowledgeLevels } from '../../../common/modules/persistence/entities';
import {
  NewDomainKnowledgeLevelsRequestDto,
  UpdateDomainKnowledgeLevelsRequestDto,
} from '../dto';
import { DomainKnowledgeLevelsService } from '../services';

@Controller('domain-knowledge-levels')
export class DomainKnowledgeLevelsController {
  constructor(private readonly service: DomainKnowledgeLevelsService) {}

  @Get()
  async findAll(): Promise<ResponseDto<DomainKnowledgeLevels[]>> {
    const data = await this.service.findAll();
    return CrudController.response(data);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<ResponseDto<DomainKnowledgeLevels>> {
    const data = await this.service.findOne('domainKnowledgeLevelId', id);
    return CrudController.response(data);
  }

  @Post()
  async create(
    @Body() request: NewDomainKnowledgeLevelsRequestDto,
  ): Promise<ResponseDto<DomainKnowledgeLevels>> {
    const newData = new DomainKnowledgeLevels();
    newData.domainKnowledgeLevelId = ulid();
    newData.domainKnowledgeId = request.domainKnowledgeId;
    newData.configurationLevelId = request.configurationLevelId;
    newData.levelId = request.levelId;

    const data = await this.service.create(newData);
    return CrudController.response(data);
  }

  @Put(':id')
  async update(
    @Body() request: UpdateDomainKnowledgeLevelsRequestDto,
    @Param('id') id: string,
  ): Promise<ResponseDto<DomainKnowledgeLevels>> {
    const update = new DomainKnowledgeLevels();
    if (request.domainKnowledgeId) {
      update.domainKnowledgeId = request.domainKnowledgeId;
    }
    if (request.configurationLevelId) {
      update.configurationLevelId = request.configurationLevelId;
    }
    if (request.levelId) {
      update.levelId = request.levelId;
    }
    if (request.status !== undefined) {
      update.status = request.status;
    }

    const data = await this.service.update(
      'domainKnowledgeLevelId',
      id,
      update,
    );
    return CrudController.response(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ResponseDto<boolean>> {
    const data = await this.service.delete('domainKnowledgeLevelId', id);
    return CrudController.response(data);
  }
}
