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
import { Levels } from '../../../common/modules/persistence/entities';
import { NewLevelRequestDto, UpdateLevelRequestDto } from '../dto';
import { LevelsService } from '../services';

@Controller('levels')
export class LevelsController {
  constructor(private readonly service: LevelsService) {}

  @Get()
  async findAll(): Promise<ResponseDto<Levels[]>> {
    const data = await this.service.findAll();
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
  ): Promise<ResponseDto<Levels>> {
    const newData = new Levels();
    newData.levelId = ulid();
    newData.name = request.name;

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
    if (request.status) {
      update.status = request.status;
    }
    update.updatedAt = new Date();

    const data = await this.service.update('levelId', id, update);
    return CrudController.response(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const data = await this.service.delete('levelId', id);
    return CrudController.response(data);
  }
}
