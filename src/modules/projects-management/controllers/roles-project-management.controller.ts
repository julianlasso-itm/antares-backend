import { ResponseDto } from '@common/dto/response.dto';
import { CrudController } from '@common/utils/crud.controller';
import { RolesSecurity } from '@entities/security/roles-security.entity';
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
  ): Promise<ResponseDto<FindAllResponse<RolesSecurity>>> {
    const data = await this.service.findAll(
      page,
      size,
      {
        status: 'DESC',
        createdAt: 'ASC',
      },
      ['name', 'description'],
      search,
    );
    return CrudController.response(data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseDto<RolesSecurity>> {
    const data = await this.service.findOne('roleId', id);
    return CrudController.response(data);
  }

  @Post()
  async create(
    @Body() request: NewRoleSecurityDto,
  ): Promise<ResponseDto<RolesSecurity>> {
    const newData = new RolesSecurity();
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
  ): Promise<ResponseDto<RolesSecurity>> {
    const update = new RolesSecurity();
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
