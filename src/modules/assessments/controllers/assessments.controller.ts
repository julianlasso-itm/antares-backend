import { NewAssessmentsRequestDto } from '@assessments/dto/new-assessments-request.dto';
import { UpdateAssessmentsRequestDto } from '@assessments/dto/update-assessments-request.dto';
import { AssessmentsService } from '@assessments/services/assessments.service';
import { ResponseDto } from '@common/dto/response.dto';
import { CrudController } from '@common/utils/crud.controller';
import { Assessments } from '@entities/assessments/assessments.entity';
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

@Controller('assessments')
export class AssessmentsController {
  constructor(private readonly service: AssessmentsService) {}

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
  ): Promise<ResponseDto<FindAllResponse<Assessments>>> {
    const data = await this.service.findAll(page, size, {
      status: 'DESC',
      createdAt: 'ASC',
    });
    return CrudController.response(data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseDto<Assessments>> {
    const data = await this.service.findOne('assessmentId', id);
    return CrudController.response(data);
  }

  @Post()
  async create(
    @Body() request: NewAssessmentsRequestDto,
  ): Promise<ResponseDto<Assessments>> {
    console.log('AssessmentsController.create');
    const newData = new Assessments();
    newData.assessmentId = ulid();
    newData.rolePerProfessionalId = request.rolePerProfessionalId;
    newData.userId = request.userId; // TODO: Esto debería salir del token de autenticación en relación al correo del usuario
    newData.startDate = new Date();

    const data = await this.service.create(newData);
    return CrudController.response(data);
  }

  @Put(':id')
  async update(
    @Body() request: UpdateAssessmentsRequestDto,
    @Param('id') id: string,
  ): Promise<ResponseDto<Assessments>> {
    console.log('AssessmentsController.update');
    const update = new Assessments();
    if (request.observations) {
      update.observations = request.observations;
    }
    if (request.score !== undefined) {
      update.score = request.score;
    }
    if (request.status !== undefined) {
      update.status = request.status;
    }

    const data = await this.service.update('assessmentId', id, update);
    return CrudController.response(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ResponseDto<boolean>> {
    console.log('AssessmentsController.delete');
    const data = await this.service.delete('assessmentId', id);
    return CrudController.response(data);
  }
}
