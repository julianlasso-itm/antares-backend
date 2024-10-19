import { ResponseDto } from '@common/dto/response.dto';
import { CrudController } from '@common/utils/crud.controller';
import { UserPerRole } from '@entities/security/user-per-role.entity';
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
import { FindAllResponse } from '@repositories/find-all.response';
import { NewUserPerRoleDto } from '@security/dto/new-user-per-role.dto';
import { UpdateUserPerRoleDto } from '@security/dto/update-user-per-role.dto';
import { UserPerRoleService } from '@security/services/user-per-role.service';
import { ulid } from 'ulid';

@Controller('user-per-role')
export class UserPerRoleController {
  constructor(private readonly service: UserPerRoleService) {}

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
  ): Promise<ResponseDto<FindAllResponse<UserPerRole>>> {
    const data = await this.service.findAll(page, size, {
      status: 'DESC',
      createdAt: 'ASC',
    });
    return CrudController.response(data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseDto<UserPerRole>> {
    const data = await this.service.findOne('userPerRoleId', id);
    return CrudController.response(data);
  }

  @Post()
  async create(
    @Body() request: NewUserPerRoleDto,
  ): Promise<ResponseDto<UserPerRole>> {
    const newData = new UserPerRole();
    newData.userPerRoleId = ulid();
    newData.userId = request.userId;
    newData.roleId = request.roleId;

    const data = await this.service.create(newData);
    return CrudController.response(data);
  }

  @Put(':id')
  async update(
    @Body() request: UpdateUserPerRoleDto,
    @Param('id') id: string,
  ): Promise<ResponseDto<UserPerRole>> {
    const update = new UserPerRole();
    if (request.userId) {
      update.userId = request.userId;
    }
    if (request.roleId) {
      update.roleId = request.roleId;
    }
    if (request.status !== undefined) {
      update.status = request.status;
    }

    const data = await this.service.update('userPerRoleId', id, update);
    return CrudController.response(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ResponseDto<boolean>> {
    const data = await this.service.delete('userPerRoleId', id);
    return CrudController.response(data);
  }
}
