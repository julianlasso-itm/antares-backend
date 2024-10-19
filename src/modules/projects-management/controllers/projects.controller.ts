import { ResponseDto } from '@common/dto/response.dto';
import { CrudController } from '@common/utils/crud.controller';
import { Projects } from '@entities/projects-management/projects.entity';
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
import { NewProjectDto } from '@projects-management/dto/new-project.dto';
import { UpdateProjectDto } from '@projects-management/dto/update-project.dto';
import { ProjectsService } from '@projects-management/services/projects.service';
import { FindAllResponse } from '@repositories/find-all.response';
import { ulid } from 'ulid';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly service: ProjectsService) {}

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
    @Query('search') search?: string,
    @Query('filter') filter?: string,
  ): Promise<ResponseDto<FindAllResponse<Projects>>> {
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
