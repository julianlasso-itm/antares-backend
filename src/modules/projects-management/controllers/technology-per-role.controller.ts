import { ResponseDto } from '@common/dto/response.dto';
import { CrudController } from '@common/utils/crud.controller';
import { TechnologyPerRole } from '@entities/projects-management/technology-per-role.entity';
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
import { NewTechnologyPerRoleDto } from '@projects-management/dto/new-technology-per-role.dto';
import { UpdateTechnologyPerRoleDto } from '@projects-management/dto/update-technology-per-role.dto';
import { TechnologyPerRoleService } from '@projects-management/services/technology-per-role.service';
import { FindAllResponse } from '@repositories/find-all.response';
import { ulid } from 'ulid';

@Controller('technology-per-role')
export class TechnologyPerRoleController {
  constructor(private readonly service: TechnologyPerRoleService) {}

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
    @Query('search') search?: string,
    @Query('filter') filter?: string,
    @Query('withDisabled') withDisabled?: boolean,
  ): Promise<ResponseDto<FindAllResponse<TechnologyPerRole>>> {
    const data = await this.service.findAll(
      page,
      size,
      {
        status: 'DESC',
        customer: {
          name: 'ASC',
        },
        project: {
          name: 'ASC',
        },
        role: {
          name: 'ASC',
        },
        technologyItem: {
          name: 'ASC',
        },
      },
      ['role.name', 'project.name', 'technologyItem.name', 'customer.name'],
      search,
      filter,
      withDisabled,
    );
    return CrudController.response(data);
  }

  @Get('find-only-roles-by-project')
  async findOnlyRolesByProject(
    @Query('projectId') projectId: string,
  ): Promise<ResponseDto<FindAllResponse<{ roleId: string; name: string }>>> {
    const data = await this.service.findOnlyRolesByProject(projectId);
    return CrudController.response(data);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<ResponseDto<TechnologyPerRole>> {
    const data = await this.service.findOne('technologyPerRoleId', id);
    return CrudController.response(data);
  }

  @Post()
  async create(
    @Body() request: NewTechnologyPerRoleDto,
  ): Promise<ResponseDto<TechnologyPerRole>> {
    const newData = new TechnologyPerRole();
    newData.technologyPerRoleId = ulid();
    newData.roleId = request.roleId;
    newData.technologyStackId = request.technologyStackId;

    const data = await this.service.create(newData);
    return CrudController.response(data);
  }

  @Put(':id')
  async update(
    @Body() request: UpdateTechnologyPerRoleDto,
    @Param('id') id: string,
  ): Promise<ResponseDto<TechnologyPerRole>> {
    const update = new TechnologyPerRole();
    if (request.roleId) {
      update.roleId = request.roleId;
    }
    if (request.technologyStackId) {
      update.technologyStackId = request.technologyStackId;
    }
    if (request.status !== undefined) {
      update.status = request.status;
    }

    const data = await this.service.update('technologyPerRoleId', id, update);
    return CrudController.response(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ResponseDto<boolean>> {
    const data = await this.service.delete('technologyPerRoleId', id);
    return CrudController.response(data);
  }
}
