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
import { Customers } from '../../../common/modules/persistence/entities';
import { NewCustomerDto, UpdateCustomerDto } from '../dto';
import { CustomersService } from '../services';

@Controller('customers')
export class CustomersController {
  constructor(private readonly service: CustomersService) {}

  @Get()
  async findAll(): Promise<ResponseDto<Customers[]>> {
    const data = await this.service.findAll();
    return CrudController.response(data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseDto<Customers>> {
    const data = await this.service.findOne('customerId', id);
    return CrudController.response(data);
  }

  @Post()
  async create(
    @Body() request: NewCustomerDto,
  ): Promise<ResponseDto<Customers>> {
    const newData = new Customers();
    newData.customerId = ulid();
    newData.name = request.name;

    const data = await this.service.create(newData);
    return CrudController.response(data);
  }

  @Put(':id')
  async update(
    @Body() request: UpdateCustomerDto,
    @Param('id') id: string,
  ): Promise<ResponseDto<Customers>> {
    const update = new Customers();
    if (request.name) {
      update.name = request.name;
    }
    if (request.status !== undefined) {
      update.status = request.status;
    }

    const data = await this.service.update('customerId', id, update);
    return CrudController.response(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ResponseDto<boolean>> {
    const data = await this.service.delete('customerId', id);
    return CrudController.response(data);
  }
}
