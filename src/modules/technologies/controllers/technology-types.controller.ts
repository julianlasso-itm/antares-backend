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
import { TechnologyTypes } from '../../../common/modules/persistence/entities';
import { NewTechnologyTypeDto, UpdateTechnologyTypeDto } from '../dto';
import { TechnologyTypesService } from '../services';

@ApiTags('technologies')
@Controller('types')
export class TechnologyTypesController {
  constructor(private readonly service: TechnologyTypesService) {}

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
    @Query('search') search?: string,
  ): Promise<ResponseDto<FindAllResponse<TechnologyTypes>>> {
    const data = await this.service.findAll(
      page,
      size,
      {
        status: 'DESC',
        createdAt: 'ASC',
      },
      ['name', 'description'],
      search,
    );
    return CrudController.response(data);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<ResponseDto<TechnologyTypes>> {
    const data = await this.service.findOne('technologyTypeId', id);
    return CrudController.response(data);
  }

  @Post()
  async create(
    @Body() request: NewTechnologyTypeDto,
  ): Promise<ResponseDto<TechnologyTypes>> {
    const newData = new TechnologyTypes();
    newData.technologyTypeId = ulid();
    newData.name = request.name;
    newData.description = request.description ?? null;

    const data = await this.service.create(newData);
    return CrudController.response(data);
  }

  @Put(':id')
  async update(
    @Body() request: UpdateTechnologyTypeDto,
    @Param('id') id: string,
  ): Promise<ResponseDto<TechnologyTypes>> {
    const update = new TechnologyTypes();
    if (request.name) {
      update.name = request.name;
    }
    if (request.description !== undefined) {
      update.description = request.description;
    }
    if (request.status !== undefined) {
      update.status = request.status;
    }

    const data = await this.service.update('technologyTypeId', id, update);
    return CrudController.response(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ResponseDto<boolean>> {
    const data = await this.service.delete('technologyTypeId', id);
    return CrudController.response(data);
  }
}
