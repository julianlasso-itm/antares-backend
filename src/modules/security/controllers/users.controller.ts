import { ResponseDto } from '@common/dto/response.dto';
import { CrudController } from '@common/utils/crud.controller';
import { Users } from '@entities/security/users.entity';
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
import { NewUserDto } from '@security/dto/new-user.dto';
import { UpdateUserDto } from '@security/dto/update-user.dto';
import { UsersService } from '@security/services/users.service';
import { ulid } from 'ulid';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
    @Query('search') search?: string,
  ): Promise<ResponseDto<FindAllResponse<Users>>> {
    const data = await this.service.findAll(
      page,
      size,
      {
        status: 'DESC',
        createdAt: 'ASC',
      },
      ['name', 'email'],
      search,
    );
    return CrudController.response(data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseDto<Users>> {
    const data = await this.service.findOne('userId', id);
    return CrudController.response(data);
  }

  @Post()
  async create(@Body() request: NewUserDto): Promise<ResponseDto<Users>> {
    const newData = new Users();
    newData.userId = ulid();
    newData.name = request.name;
    newData.email = request.email;

    const data = await this.service.create(newData);
    return CrudController.response(data);
  }

  @Put(':id')
  async update(
    @Body() request: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<ResponseDto<Users>> {
    const update = new Users();
    if (request.name) {
      update.name = request.name;
    }
    if (request.email) {
      update.email = request.email;
    }
    if (request.status !== undefined) {
      update.status = request.status;
    }

    const data = await this.service.update('userId', id, update);
    return CrudController.response(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ResponseDto<boolean>> {
    const data = await this.service.delete('userId', id);
    return CrudController.response(data);
  }
}
