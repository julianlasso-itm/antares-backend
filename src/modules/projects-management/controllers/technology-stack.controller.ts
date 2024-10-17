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
import { TechnologyStack } from '../../../common/modules/persistence/entities';
import { NewTechnologyStackDto, UpdateTechnologyStackDto } from '../dto';
import { TechnologyStackService } from '../services';

@ApiTags('projects-management')
@Controller('technology-stack')
export class TechnologyStackController {
  constructor(private readonly service: TechnologyStackService) {}

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
    @Query('search') search?: string,
    @Query('filter') filter?: string,
  ): Promise<ResponseDto<FindAllResponse<TechnologyStack>>> {
    const data = await this.service.findAll(
      page,
      size,
      {
        project: {
          name: 'ASC',
        },
        status: 'DESC',
        weight: 'DESC',
      },
      [],
      search,
      filter,
    );
    return CrudController.response(data);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<ResponseDto<TechnologyStack>> {
    const data = await this.service.findOne('technologyStackId', id);
    return CrudController.response(data);
  }

  @Post()
  async create(
    @Body() request: NewTechnologyStackDto,
  ): Promise<ResponseDto<TechnologyStack>> {
    const newData = new TechnologyStack();
    newData.technologyStackId = ulid();
    newData.projectId = request.projectId;
    newData.technologyItemId = request.technologyItemId;
    newData.weight =
      request.weight?.toString().length === 0 ? null : request.weight;

    const data = await this.service.create(newData);
    return CrudController.response(data);
  }

  @Put(':id')
  async update(
    @Body() request: UpdateTechnologyStackDto,
    @Param('id') id: string,
  ): Promise<ResponseDto<TechnologyStack>> {
    const update = new TechnologyStack();
    if (request.projectId) {
      update.projectId = request.projectId;
    }
    if (request.technologyItemId) {
      update.technologyItemId = request.technologyItemId;
    }
    if (request.weight) {
      update.weight =
        request.weight.toString().length === 0 ? null : request.weight;
    }
    if (request.status !== undefined) {
      update.status = request.status;
    }

    const data = await this.service.update('technologyStackId', id, update);
    return CrudController.response(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ResponseDto<boolean>> {
    const data = await this.service.delete('technologyStackId', id);
    return CrudController.response(data);
  }
}
