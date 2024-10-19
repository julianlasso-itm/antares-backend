import { ResponseDto } from '@common/dto/response.dto';
import { CrudController } from '@common/utils/crud.controller';
import { TechnologyStack } from '@entities/projects-management/technology-stack.entity';
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
import { NewTechnologyStackDto } from '@projects-management/dto/new-technology-stack.dto';
import { UpdateTechnologyStackDto } from '@projects-management/dto/update-technology-stack.dto';
import { TechnologyStackService } from '@projects-management/services/technology-stack.service';
import { FindAllResponse } from '@repositories/find-all.response';
import { ulid } from 'ulid';

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
      ['project.name', 'technologyItem.name'],
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
      request.weight?.toString().length === 0 ? null : (request.weight ?? null);

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
