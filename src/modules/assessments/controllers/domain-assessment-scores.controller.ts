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
import { DomainAssessmentScores } from '../../../common/modules/persistence/entities';
import {
  NewDomainAssessmentScoresDto,
  UpdateDomainAssessmentScoresDto,
} from '../dto';
import { DomainAssessmentScoresService } from '../services/domain-assessment-scores.service';

@Controller('domain-assessment-scores')
export class DomainAssessmentScoresController {
  constructor(private readonly service: DomainAssessmentScoresService) {}

  @Get()
  async findAll(): Promise<ResponseDto<DomainAssessmentScores[]>> {
    const data = await this.service.findAll();
    return CrudController.response(data);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<ResponseDto<DomainAssessmentScores>> {
    const data = await this.service.findOne('domainAssessmentScoreId', id);
    return CrudController.response(data);
  }

  @Post()
  async create(
    @Body() request: NewDomainAssessmentScoresDto,
  ): Promise<ResponseDto<DomainAssessmentScores>> {
    const newData = new DomainAssessmentScores();
    newData.domainAssessmentScoreId = ulid();
    newData.assessmentId = request.assessmentId;
    newData.domainKnowledgeId = request.domainKnowledgeId;
    newData.configurationLevelId = request.configurationLevelId;
    newData.score = request.score;
    newData.observations = request.observations;

    const data = await this.service.create(newData);
    return CrudController.response(data);
  }

  @Put(':id')
  async update(
    @Body() request: UpdateDomainAssessmentScoresDto,
    @Param('id') id: string,
  ): Promise<ResponseDto<DomainAssessmentScores>> {
    const update = new DomainAssessmentScores();
    if (request.observations) {
      update.observations = request.observations;
    }
    if (request.score !== undefined) {
      update.score = request.score;
    }
    if (request.status !== undefined) {
      update.status = request.status;
    }

    const data = await this.service.update(
      'domainAssessmentScoreId',
      id,
      update,
    );
    return CrudController.response(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ResponseDto<boolean>> {
    const data = await this.service.delete('domainAssessmentScoreId', id);
    return CrudController.response(data);
  }
}
