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
import { ConfigurationPerLevel } from '../../../common/modules/persistence/entities';
import {
  NewConfigurationPerLevelRequestDto,
  UpdateConfigurationPerLevelRequestDto,
} from '../dto';
import { ConfigurationPerLevelService } from '../services';

@Controller('configuration-per-level')
export class ConfigurationPerLevelController {
  constructor(private readonly service: ConfigurationPerLevelService) {}

  @Get()
  async findAll(): Promise<ResponseDto<ConfigurationPerLevel[]>> {
    const data = await this.service.findAll();
    return CrudController.response(data);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<ResponseDto<ConfigurationPerLevel>> {
    const data = await this.service.findOne('configurationPerLevelId', id);
    return CrudController.response(data);
  }

  @Post()
  async create(
    @Body() request: NewConfigurationPerLevelRequestDto,
  ): Promise<ResponseDto<ConfigurationPerLevel>> {
    const newData = new ConfigurationPerLevel();
    newData.configurationPerLevelId = ulid();
    newData.configurationLevelId = request.configurationLevelId;
    newData.levelId = request.levelId;
    newData.position = request.position;

    const data = await this.service.create(newData);
    return CrudController.response(data);
  }

  @Put(':id')
  async update(
    @Body() request: UpdateConfigurationPerLevelRequestDto,
    @Param('id') id: string,
  ): Promise<ResponseDto<ConfigurationPerLevel>> {
    const update = new ConfigurationPerLevel();
    if (request.configurationLevelId) {
      update.configurationLevelId = request.configurationLevelId;
    }
    if (request.levelId) {
      update.levelId = request.levelId;
    }
    if (request.position !== undefined) {
      update.position = request.position;
    }
    if (request.status !== undefined) {
      update.status = request.status;
    }

    const data = await this.service.update(
      'configurationPerLevelId',
      id,
      update,
    );
    return CrudController.response(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ResponseDto<boolean>> {
    const data = await this.service.delete('configurationPerLevelId', id);
    return CrudController.response(data);
  }
}
