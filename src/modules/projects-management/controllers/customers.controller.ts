import { ResponseDto } from '@common/dto/response.dto';
import { CrudController } from '@common/utils/crud.controller';
import { Customers } from '@entities/projects-management/customers.entity';
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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NewCustomerDto } from '@projects-management/dto/new-customer.dto';
import { UpdateCustomerDto } from '@projects-management/dto/update-customer.dto';
import { CustomersService } from '@projects-management/services/customers.service';
import { FindAllResponse } from '@repositories/find-all.response';
import { ulid } from 'ulid';

@Controller('customers')
export class CustomersController {
  constructor(private readonly service: CustomersService) {}

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
    @Query('search') search?: string,
  ): Promise<ResponseDto<FindAllResponse<Customers>>> {
    const data = await this.service.findAll(
      page,
      size,
      {
        status: 'DESC',
        createdAt: 'ASC',
      },
      ['name'],
      search,
    );
    return CrudController.response(data);
  }

  @ApiTags('reports')
  @ApiOperation({
    summary: 'Obtener reporte general del sistema',
    description:
      'Devuelve un reporte con la información de todo el sistema desde los clientes hasta los profesionales evaluados y sus seguimientos',
  })
  @ApiResponse({
    status: 200,
    description: 'Reporte generado',
    // type: ResponseDto<Customers[]>,
    // example: {},
  })
  @Get('report')
  async getReport(): Promise<ResponseDto<Customers[]>> {
    const data = await this.service.getReport();
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
