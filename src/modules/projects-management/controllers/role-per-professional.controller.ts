import { ResponseDto } from '@common/dto/response.dto';
import { CrudController } from '@common/utils/crud.controller';
import { RolePerProfessional } from '@entities/projects-management/role-per-professional.entity';
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
import { NewRolePerProfessionalDto } from '@projects-management/dto/new-role-per-professional.dto';
import { UpdateRolePerProfessionalDto } from '@projects-management/dto/update-role-per-professional.dto';
import { RolePerProfessionalService } from '@projects-management/services/role-per-professional.service';
import { FindAllResponse } from '@repositories/find-all.response';
import { ulid } from 'ulid';

@Controller('role-per-professional')
export class RolePerProfessionalController {
  constructor(private readonly service: RolePerProfessionalService) {}

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
    @Query('search') search?: string,
    @Query('filter') filter?: string,
    @Query('withDisabled') withDisabled?: boolean,
    @Query('isActiveOnAccount') isActiveOnAccount?: boolean,
  ): Promise<ResponseDto<FindAllResponse<RolePerProfessional>>> {
    const data = await this.service.findAll(
      page,
      size,
      {
        status: 'DESC',
        professional: {
          name: 'ASC',
        },
        role: {
          name: 'ASC',
        },
      },
      ['role.name', 'professional.name'],
      search,
      filter,
      withDisabled,
      isActiveOnAccount,
    );
    return CrudController.response(data);
  }

  @Get('get-assessment-by-role-per-professional')
  async getAssessmentsByRolePerProfessional(
    @Query('rolePerProfessionalId') rolePerProfessionalId: string,
    @Query('levelId') levelId?: string,
  ): Promise<ResponseDto<RolePerProfessional>> {
    const data = await this.service.getAssessmentsByRolePerProfessional(
      rolePerProfessionalId,
      levelId,
    );
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
    newData.endDate = request.endDate ?? null;

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
