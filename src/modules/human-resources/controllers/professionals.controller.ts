import { ResponseDto } from '@common/dto/response.dto';
import { CrudController } from '@common/utils/crud.controller';
import { Professionals } from '@entities/human-resources/professionals.entity';
import { NewProfessionalsRequestDto } from '@human-resources/dto/new-professionals-request.dto';
import { UpdateProfessionalsRequestDto } from '@human-resources/dto/update-professionals-request.dto';
import { ProfessionalsService } from '@human-resources/services/professionals.service';
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

@Controller('professionals')
export class ProfessionalsController {
  constructor(private readonly service: ProfessionalsService) {}

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
    @Query('search') search?: string,
  ): Promise<ResponseDto<FindAllResponse<Professionals>>> {
    const data = await this.service.findAll(
      page,
      size,
      {
        status: 'DESC',
        createdAt: 'ASC',
      },
      ['documentType', 'document', 'name', 'email'],
      search,
    );
    return CrudController.response(data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseDto<Professionals>> {
    const data = await this.service.findOne('professionalId', id);
    return CrudController.response(data);
  }

  @Post()
  async create(
    @Body() request: NewProfessionalsRequestDto,
  ): Promise<ResponseDto<Professionals>> {
    const newData = new Professionals();
    newData.professionalId = ulid();
    newData.documentType = request.documentType;
    newData.document = request.document;
    newData.name = request.name;
    newData.email = request.email;
    newData.photo = request.photo ?? null;

    const data = await this.service.create(newData);
    return CrudController.response(data);
  }

  @Put(':id')
  async update(
    @Body() request: UpdateProfessionalsRequestDto,
    @Param('id') id: string,
  ): Promise<ResponseDto<Professionals>> {
    const update = new Professionals();
    if (request.name) {
      update.name = request.name;
    }
    if (request.email) {
      update.email = request.email;
    }
    if (request.photo) {
      update.photo = request.photo;
    }
    if (request.status !== undefined) {
      update.status = request.status;
    }

    const data = await this.service.update('professionalId', id, update);
    return CrudController.response(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ResponseDto<boolean>> {
    const data = await this.service.delete('professionalId', id);
    return CrudController.response(data);
  }
}
