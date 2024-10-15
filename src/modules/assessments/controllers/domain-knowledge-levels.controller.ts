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
import { ApiTags } from '@nestjs/swagger';
import { ulid } from 'ulid';
import { CrudController, ResponseDto } from '../../../common';
import { FindAllResponse } from '../../../common/modules/persistence';
import { DomainKnowledgeLevels } from '../../../common/modules/persistence/entities';
import {
  NewDomainKnowledgeLevelsRequestDto,
  UpdateDomainKnowledgeLevelsRequestDto,
} from '../dto';
import { DomainKnowledgeLevelsService } from '../services';

@ApiTags('assessments')
@Controller('domain-knowledge-levels')
export class DomainKnowledgeLevelsController {
  constructor(private readonly service: DomainKnowledgeLevelsService) {}

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
    @Query('search') search?: string,
    @Query('filter') filter?: string,
  ): Promise<ResponseDto<FindAllResponse<DomainKnowledgeLevels>>> {
    const data = await this.service.findAll(
      page,
      size,
      {
        status: 'DESC',
        createdAt: 'ASC',
      },
      [],
      search,
      filter,
    );
    return CrudController.response(data);
  }

  @Get('find-one')
  async findOneWithFilter(
    @Query('level') levelId: string,
    @Query('domainKnowledge') domainKnowledgeId: string,
  ): Promise<ResponseDto<DomainKnowledgeLevels>> {
    const query = {
      domainKnowledgeId,
      levelId,
    } as Partial<DomainKnowledgeLevels>;
    const data = await this.service.findOneWithFilter(query);
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
