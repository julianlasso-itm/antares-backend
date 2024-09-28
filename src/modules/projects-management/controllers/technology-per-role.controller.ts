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
import { TechnologyPerRole } from '../../../common/modules/persistence/entities';
import { NewTechnologyPerRoleDto, UpdateTechnologyPerRoleDto } from '../dto';
import { TechnologyPerRoleService } from '../services';

@Controller('technology-per-role')
export class TechnologyPerRoleController {
  constructor(private readonly service: TechnologyPerRoleService) {}

  @Get()
  async findAll(): Promise<ResponseDto<TechnologyPerRole[]>> {
    const data = await this.service.findAll();
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
