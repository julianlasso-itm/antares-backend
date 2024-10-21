import { ResponseDto } from '@common/dto/response.dto';
import { CrudController } from '@common/utils/crud.controller';
import { RolesProjectManagement } from '@entities/projects-management/roles-projects-management.entity';
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
import { RolesProjectManagementService } from '@projects-management/services/roles-project-management.service';
import { FindAllResponse } from '@repositories/find-all.response';
import { NewRoleSecurityDto } from '@security/dto/new-role-security.dto';
import { UpdateRoleSecurityDto } from '@security/dto/update-role-security.dto';
import { ulid } from 'ulid';

@Controller('roles')
export class RolesProjectManagementController {
  constructor(private readonly service: RolesProjectManagementService) {}

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
    @Query('search') search?: string,
    @Query('filter') filter?: string,
    @Query('withDisabled') withDisabled?: boolean,
  ): Promise<ResponseDto<FindAllResponse<RolesProjectManagement>>> {
    const data = await this.service.findAll(
      page,
      size,
      {
        status: 'DESC',
        createdAt: 'ASC',
      },
      ['name', 'description'],
      search,
      filter,
      withDisabled,
    );
    return CrudController.response(data);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<ResponseDto<RolesProjectManagement>> {
    const data = await this.service.findOne('roleId', id);
    return CrudController.response(data);
  }

  @Post()
  async create(
    @Body() request: NewRoleSecurityDto,
  ): Promise<ResponseDto<RolesProjectManagement>> {
    const newData = new RolesProjectManagement();
    newData.roleId = ulid();
    newData.name = request.name;
    newData.description = request.description;

    const data = await this.service.create(newData);
    return CrudController.response(data);
  }

  @Put(':id')
  async update(
    @Body() request: UpdateRoleSecurityDto,
    @Param('id') id: string,
  ): Promise<ResponseDto<RolesProjectManagement>> {
    const update = new RolesProjectManagement();
    if (request.name) {
      update.name = request.name;
    }
    if (request.description) {
      update.description = request.description;
    }
    if (request.status !== undefined) {
      update.status = request.status;
    }

    const data = await this.service.update('roleId', id, update);
    return CrudController.response(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ResponseDto<boolean>> {
    const data = await this.service.delete('roleId', id);
    return CrudController.response(data);
  }
}
