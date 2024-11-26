import { AssessmentDataDto } from '@assessments/dto/assessment-data.dto';
import { AssessmentsService } from '@assessments/services/assessments.service';
import { ResponseDto } from '@common/dto/response.dto';
import { CrudController } from '@common/utils/crud.controller';
import { Assessments } from '@entities/assessments/assessments.entity';
import { DomainAssessmentScores } from '@entities/assessments/domain-assessment-scores.entity';
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
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FindAllResponse } from '@repositories/find-all.response';
import { ulid } from 'ulid';

@Controller('assessments')
export class AssessmentsController {
  constructor(private readonly service: AssessmentsService) {}

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
    @Query('search') search?: string,
    @Query('filter') filter?: string,
  ): Promise<ResponseDto<FindAllResponse<Assessments>>> {
    const data = await this.service.findAll(
      page,
      size,
      {
        status: 'DESC',
        endDate: 'DESC',
        startDate: 'DESC',
      },
      [],
      search,
      filter,
    );
    return CrudController.response(data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseDto<Assessments>> {
    const data = await this.service.findOne('assessmentId', id);
    return CrudController.response(data);
  }

  @Get('professional-completed-assessments/:professionalId')
  async professionalCompletedAssessments(
    @Param('professionalId') professionalId: string,
  ): Promise<ResponseDto<FindAllResponse<Assessments>>> {
    const data =
      await this.service.getProfessionalCompletedAssessments(professionalId);
    return CrudController.response(data);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new assessment' })
  @ApiResponse({
    status: 201,
    description: 'The assessment has been successfully created.',
  })
  async create(
    @Body() request: AssessmentDataDto,
  ): Promise<ResponseDto<Assessments>> {
    const newData = new Assessments();
    newData.assessmentId = request.assessmentId ?? ulid();
    newData.rolePerProfessionalId = request.rolePerProfessionalId;
    newData.userId = '01JB5XD7GCJW96XE1YV6V7BVJD'; // TODO: Esto debería salir del token de autenticación en relación al correo del usuario
    newData.observations = request.observations;
    newData.score = request.score;
    newData.startDate = new Date(request.startDate);
    newData.endDate = request.endDate ? new Date(request.endDate) : new Date();
    newData.status = request.status;
    newData.domainAssessmentScores = [];

    request.domainKnowledges.forEach((domainKnowledge) => {
      const domainAssessmentScore = new DomainAssessmentScores();
      domainAssessmentScore.domainAssessmentScoreId = ulid();
      domainAssessmentScore.domainKnowledgeId =
        domainKnowledge.domainKnowledgeId;
      domainAssessmentScore.configurationLevelId = request.configurationLevelId;
      domainAssessmentScore.observations = domainKnowledge.observations;
      domainAssessmentScore.score = domainKnowledge.score;
      domainAssessmentScore.rating = domainKnowledge.rating;
      domainAssessmentScore.status = true;

      newData.domainAssessmentScores.push(domainAssessmentScore);
    });

    const data = await this.service.create(newData);
    return CrudController.response(data);
  }

  @Post('assessment-partial-save')
  async assessmentPartialSave(
    @Body() request: AssessmentDataDto,
  ): Promise<ResponseDto<Assessments>> {
    const newData = new Assessments();
    newData.assessmentId = ulid();
    newData.rolePerProfessionalId = request.rolePerProfessionalId;
    newData.userId = '01JB5XD7GCJW96XE1YV6V7BVJD'; // TODO: Esto debería salir del token de autenticación en relación al correo del usuario
    newData.startDate = new Date(request.startDate);
    newData.domainAssessmentScores = [];

    request.domainKnowledges.forEach((domainKnowledge) => {
      const domainAssessmentScore = new DomainAssessmentScores();
      domainAssessmentScore.domainAssessmentScoreId = ulid();
      domainAssessmentScore.domainKnowledgeId =
        domainKnowledge.domainKnowledgeId;
      domainAssessmentScore.configurationLevelId = request.configurationLevelId;
      domainAssessmentScore.score = domainKnowledge.score;
      domainAssessmentScore.observations = domainKnowledge.observations;
      domainAssessmentScore.status = true;

      newData.domainAssessmentScores.push(domainAssessmentScore);
    });

    const data = await this.service.create(newData);
    return CrudController.response(data);
  }

  @Put(':id')
  async update(
    @Body() request: AssessmentDataDto,
    @Param('id') id: string,
  ): Promise<ResponseDto<Assessments>> {
    const update = new Assessments();
    update.assessmentId = id;
    update.observations = request.observations;
    update.score = request.score;
    update.startDate = new Date(request.startDate);
    update.endDate = request.endDate ? new Date(request.endDate) : null;
    update.status = request.status;

    const domainScores = request.domainKnowledges.map((domainKnowledge) => {
      const score = new DomainAssessmentScores();
      score.domainAssessmentScoreId =
        domainKnowledge.domainAssessmentScoreId ?? ulid();
      score.assessmentId = id;
      score.domainKnowledgeId = domainKnowledge.domainKnowledgeId;
      score.configurationLevelId = request.configurationLevelId;
      score.observations = domainKnowledge.observations;
      score.score = domainKnowledge.score;
      score.rating = domainKnowledge.rating;
      score.status = true;
      return score;
    });
    update.domainAssessmentScores = domainScores;

    const data = await this.service.update('assessmentId', id, update);
    return CrudController.response(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ResponseDto<boolean>> {
    const data = await this.service.delete('assessmentId', id);
    return CrudController.response(data);
  }
}
