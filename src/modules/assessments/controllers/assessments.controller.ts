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
import { Assessments } from '../../../common/modules/persistence/entities';
import { NewAssessmentsRequestDto, UpdateAssessmentsRequestDto } from '../dto';
import { AssessmentsService } from '../services/assessments.service';

@Controller()
export class AssessmentsController {
  constructor(private readonly service: AssessmentsService) {}

  @Get()
  async findAll(): Promise<ResponseDto<Assessments[]>> {
    const data = await this.service.findAll();
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
  ) {
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
  async delete(@Param('id') id: string) {
    const data = await this.service.delete('assessmentId', id);
    return CrudController.response(data);
  }
}
