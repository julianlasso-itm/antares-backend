import { BaseService } from '@common/services/service.abstract';
import { Customers } from '@entities/projects-management/customers.entity';
import { Injectable } from '@nestjs/common';
import CustomersRepository from '@repositories/projects-management/customers.repository';

@Injectable()
export class CustomersService extends BaseService<
  Customers,
  CustomersRepository
> {
  constructor(protected readonly repository: CustomersRepository) {
    super(repository);
  }
}
