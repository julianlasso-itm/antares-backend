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
import { ConfigurationLevels } from '../../../common/modules/persistence/entities';
import {
  NewConfigurationLevelRequestDto,
  UpdateConfigurationLevelRequestDto,
} from '../dto';
import { ConfigurationLevelsService } from '../services';

@Controller('configuration-levels')
export class ConfigurationLevelsController {
  constructor(private readonly service: ConfigurationLevelsService) {}

  @Get()
  async findAll(): Promise<ResponseDto<ConfigurationLevels[]>> {
    const data = await this.service.findAll();
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
