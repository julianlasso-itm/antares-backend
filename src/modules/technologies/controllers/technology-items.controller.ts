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
import { TechnologyItems } from '../../../common/modules/persistence/entities';
import { NewTechnologyItemDto, UpdateTechnologyItemDto } from '../dto';
import { TechnologyItemsService } from '../services';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('technologies')
@Controller('items')
export class TechnologyItemsController {
  constructor(private readonly service: TechnologyItemsService) {}

  @Get()
  async findAll(): Promise<ResponseDto<TechnologyItems[]>> {
    const data = await this.service.findAll();
    return CrudController.response(data);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<ResponseDto<TechnologyItems>> {
    const data = await this.service.findOne('technologyItemId', id);
    return CrudController.response(data);
  }

  @Post()
  async create(
    @Body() request: NewTechnologyItemDto,
  ): Promise<ResponseDto<TechnologyItems>> {
    const newData = new TechnologyItems();
    newData.technologyItemId = ulid();
    newData.technologyTypeId = request.technologyTypeId;
    newData.name = request.name;
    newData.description = request.description ?? null;
    newData.icon = request.icon ?? null;

    const data = await this.service.create(newData);
    return CrudController.response(data);
  }

  @Put(':id')
  async update(
    @Body() request: UpdateTechnologyItemDto,
    @Param('id') id: string,
  ): Promise<ResponseDto<TechnologyItems>> {
    const update = new TechnologyItems();
    if (request.technologyTypeId) {
      update.technologyTypeId = request.technologyTypeId;
    }
    if (request.name) {
      update.name = request.name;
    }
    if (request.description) {
      update.description = request.description;
    }
    if (request.icon) {
      update.icon = request.icon;
    }
    if (request.status !== undefined) {
      update.status = request.status;
    }

    const data = await this.service.update('technologyItemId', id, update);
    return CrudController.response(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ResponseDto<boolean>> {
    const data = await this.service.delete('technologyItemId', id);
    return CrudController.response(data);
  }
}
