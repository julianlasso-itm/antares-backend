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
import { ulid } from 'ulid';
import { CrudController, ResponseDto } from '../../../common';
import { FindAllResponse } from '../../../common/modules/persistence';
import { Roles } from '../../../common/modules/persistence/entities';
import { NewRoleDto, UpdateRoleDto } from '../dto';
import { RolesService } from '../services';

@Controller('roles')
export class RolesController {
  constructor(private readonly service: RolesService) {}

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
    @Query('search') search?: string,
  ): Promise<ResponseDto<FindAllResponse<Roles>>> {
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
  async findOne(@Param('id') id: string): Promise<ResponseDto<Roles>> {
    const data = await this.service.findOne('roleId', id);
    return CrudController.response(data);
  }

  @Post()
  async create(@Body() request: NewRoleDto): Promise<ResponseDto<Roles>> {
    const newData = new Roles();
    newData.roleId = ulid();
    newData.name = request.name;
    newData.description = request.description ?? null;

    const data = await this.service.create(newData);
    return CrudController.response(data);
  }

  @Put(':id')
  async update(
    @Body() request: UpdateRoleDto,
    @Param('id') id: string,
  ): Promise<ResponseDto<Roles>> {
    const update = new Roles();
    if (request.name) {
      update.name = request.name;
    }
    if (request.description) {
      update.description =
        request.description.length === 0 ? null : request.description;
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
