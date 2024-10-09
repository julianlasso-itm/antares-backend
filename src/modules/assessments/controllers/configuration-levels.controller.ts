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
import { ConfigurationLevels } from '../../../common/modules/persistence/entities';
import {
  NewConfigurationLevelRequestDto,
  UpdateConfigurationLevelRequestDto,
} from '../dto';
import { ConfigurationLevelsService } from '../services';

@ApiTags('assessments')
@Controller('configuration-levels')
export class ConfigurationLevelsController {
  constructor(private readonly service: ConfigurationLevelsService) {}

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
    @Query('search') search?: string,
  ): Promise<ResponseDto<FindAllResponse<ConfigurationLevels>>> {
    const data = await this.service.findAll(
      page,
      size,
      {
        status: 'DESC',
        createdAt: 'ASC',
      },
      ['name'],
      search,
    );
    return CrudController.response(data);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<ResponseDto<ConfigurationLevels>> {
    const data = await this.service.findOne('configurationLevelId', id);
    return CrudController.response(data);
  }

  @Post()
  async create(
    @Body() request: NewConfigurationLevelRequestDto,
  ): Promise<ResponseDto<ConfigurationLevels>> {
    const newData = new ConfigurationLevels();
    newData.configurationLevelId = ulid();
    newData.name = request.name;

    const data = await this.service.create(newData);
    return CrudController.response(data);
  }

  @Put(':id')
  async update(
    @Body() request: UpdateConfigurationLevelRequestDto,
    @Param('id') id: string,
  ): Promise<ResponseDto<ConfigurationLevels>> {
    const update = new ConfigurationLevels();
    if (request.name) {
      update.name = request.name;
    }
    if (request.status !== undefined) {
      update.status = request.status;
    }

    const data = await this.service.update('configurationLevelId', id, update);
    return CrudController.response(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ResponseDto<boolean>> {
    const data = await this.service.delete('configurationLevelId', id);
    return CrudController.response(data);
  }
}
