import { NewLevelRequestDto } from '@assessments/dto/new-level-request.dto';
import { UpdateLevelRequestDto } from '@assessments/dto/update-level-request.dto';
import { LevelsService } from '@assessments/services/levels.service';
import { ResponseDto } from '@common/dto/response.dto';
import { CrudController } from '@common/utils/crud.controller';
import { ConfigurationPerLevel } from '@entities/assessments/configuration-per-level.entity';
import { Levels } from '@entities/assessments/levels.entity';
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

@Controller('levels')
export class LevelsController {
  constructor(private readonly service: LevelsService) {}

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
    @Query('search') search?: string,
    @Query('filter') filter?: string,
  ): Promise<ResponseDto<FindAllResponse<Levels>>> {
    const data = await this.service.findAll(
      page,
      size,
      {
        status: 'DESC',
        createdAt: 'ASC',
      },
      ['name'],
      search,
      filter,
    );
    return CrudController.response(data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseDto<Levels>> {
    const data = await this.service.findOne('levelId', id);
    return CrudController.response(data);
  }

  @Post()
  async create(
    @Body() request: NewLevelRequestDto,
    @Query('filter') filter?: string,
  ): Promise<ResponseDto<Levels>> {
    const newData = new Levels();
    newData.levelId = ulid();
    newData.name = request.name;
    newData.weight = request.weight;

    // Esto aún no se está usando
    // esto es una beta, ya que falta traer
    // la posición y mostrarla en el listado y ordenar por ese campo
    if (filter) {
      const configurationPerLevel = new ConfigurationPerLevel();
      configurationPerLevel.configurationPerLevelId = ulid();
      configurationPerLevel.configurationLevelId = filter;
      configurationPerLevel.position = 1;
      newData.configurationPerLevels = [configurationPerLevel];
    }

    const data = await this.service.create(newData);
    return CrudController.response(data);
  }

  @Put(':id')
  async update(
    @Body() request: UpdateLevelRequestDto,
    @Param('id') id: string,
  ) {
    const update = new Levels();
    if (request.name) {
      update.name = request.name;
    }
    if (request.status !== undefined) {
      update.status = request.status;
    }
    if (request.weight) {
      update.weight = request.weight;
    }

    const data = await this.service.update('levelId', id, update);
    return CrudController.response(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const data = await this.service.delete('levelId', id);
    return CrudController.response(data);
  }
}
