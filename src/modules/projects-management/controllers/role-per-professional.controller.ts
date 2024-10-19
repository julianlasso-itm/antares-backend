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
import { RolePerProfessional } from '../../../common/modules/persistence/entities';
import {
  NewRolePerProfessionalDto,
  UpdateRolePerProfessionalDto,
} from '../dto';
import { RolePerProfessionalService } from '../services';

@Controller('role-per-professional')
export class RolePerProfessionalController {
  constructor(private readonly service: RolePerProfessionalService) {}

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
  ): Promise<ResponseDto<FindAllResponse<RolePerProfessional>>> {
    const data = await this.service.findAll(page, size, {
      status: 'DESC',
      createdAt: 'ASC',
    });
    return CrudController.response(data);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<ResponseDto<RolePerProfessional>> {
    const data = await this.service.findOne('rolePerProfessionalId', id);
    return CrudController.response(data);
  }

  @Post()
  async create(
    @Body() request: NewRolePerProfessionalDto,
  ): Promise<ResponseDto<RolePerProfessional>> {
    const newData = new RolePerProfessional();
    newData.rolePerProfessionalId = ulid();
    newData.roleId = request.roleId;
    newData.professionalId = request.professionalId;
    newData.startDate = request.startDate;

    const data = await this.service.create(newData);
    return CrudController.response(data);
  }

  @Put(':id')
  async update(
    @Body() request: UpdateRolePerProfessionalDto,
    @Param('id') id: string,
  ): Promise<ResponseDto<RolePerProfessional>> {
    const update = new RolePerProfessional();
    if (request.roleId) {
      update.roleId = request.roleId;
    }
    if (request.professionalId) {
      update.professionalId = request.professionalId;
    }
    if (request.startDate) {
      update.startDate = request.startDate;
    }
    if (request.endDate) {
      update.endDate = request.endDate;
    }
    if (request.status !== undefined) {
      update.status = request.status;
    }

    const data = await this.service.update('rolePerProfessionalId', id, update);
    return CrudController.response(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ResponseDto<boolean>> {
    const data = await this.service.delete('rolePerProfessionalId', id);
    return CrudController.response(data);
  }
}
