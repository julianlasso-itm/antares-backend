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
import { RatingScale } from '../../../common/modules/persistence/entities';
import { NewRatingScaleRequestDto, UpdateRatingScaleRequestDto } from '../dto';
import { RatingScaleService } from '../services';

@ApiTags('assessments')
@Controller('rating-scale')
export class RatingScaleController {
  constructor(private readonly service: RatingScaleService) {}

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
    @Query('search') search?: string,
  ): Promise<ResponseDto<FindAllResponse<RatingScale>>> {
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
  async findOne(@Param('id') id: string): Promise<ResponseDto<RatingScale>> {
    const data = await this.service.findOne('ratingScaleId', id);
    return CrudController.response(data);
  }

  @Post()
  async create(
    @Body() request: NewRatingScaleRequestDto,
  ): Promise<ResponseDto<RatingScale>> {
    const newData = new RatingScale();
    newData.ratingScaleId = ulid();
    newData.name = request.name;
    newData.description = request.description;
    newData.value = request.value;
    newData.position = request.position;
    newData.configurationLevelId = request.configurationLevelId;

    const data = await this.service.create(newData);
    return CrudController.response(data);
  }

  @Put(':id')
  async update(
    @Body() request: UpdateRatingScaleRequestDto,
    @Param('id') id: string,
  ) {
    const update = new RatingScale();
    if (request.name) {
      update.name = request.name;
    }
    if (request.description) {
      update.description = request.description;
    }
    if (request.value) {
      update.value = request.value;
    }
    if (request.position) {
      update.position = request.position;
    }
    if (request.configurationLevelId) {
      update.configurationLevelId = request.configurationLevelId;
    }
    if (request.status !== undefined) {
      update.status = request.status;
    }

    const data = await this.service.update('ratingScaleId', id, update);
    return CrudController.response(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const data = await this.service.delete('ratingScaleId', id);
    return CrudController.response(data);
  }
}
