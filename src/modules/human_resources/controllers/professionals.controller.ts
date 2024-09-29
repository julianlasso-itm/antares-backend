import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ulid } from 'ulid';
import { CrudController, ResponseDto } from '../../../common';
import { Professionals } from '../../../common/modules/persistence/entities';
import {
  NewProfessionalsRequestDto,
  UpdateProfessionalsRequestDto,
} from '../dto';
import { ProfessionalsService } from '../services';

@ApiTags('human-resources')
@Controller('professionals')
export class ProfessionalsController {
  constructor(private readonly service: ProfessionalsService) {}

  @Get()
  async findAll(): Promise<ResponseDto<Professionals[]>> {
    const data = await this.service.findAll();
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
