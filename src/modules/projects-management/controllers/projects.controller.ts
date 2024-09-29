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
import { Projects } from '../../../common/modules/persistence/entities';
import { NewProjectDto, UpdateProjectDto } from '../dto';
import { ProjectsService } from '../services';

@ApiTags('projects-management')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly service: ProjectsService) {}

  @Get()
  async findAll(): Promise<ResponseDto<Projects[]>> {
    const data = await this.service.findAll();
    return CrudController.response(data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseDto<Projects>> {
    const data = await this.service.findOne('projectId', id);
    return CrudController.response(data);
  }

  @Post()
  async create(@Body() request: NewProjectDto): Promise<ResponseDto<Projects>> {
    const newData = new Projects();
    newData.projectId = ulid();
    newData.name = request.name;
    newData.customerId = request.customerId;

    const data = await this.service.create(newData);
    return CrudController.response(data);
  }

  @Put(':id')
  async update(
    @Body() request: UpdateProjectDto,
    @Param('id') id: string,
  ): Promise<ResponseDto<Projects>> {
    const update = new Projects();
    if (request.name) {
      update.name = request.name;
    }
    if (request.status !== undefined) {
      update.status = request.status;
    }

    const data = await this.service.update('projectId', id, update);
    return CrudController.response(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ResponseDto<boolean>> {
    const data = await this.service.delete('projectId', id);
    return CrudController.response(data);
  }
}
