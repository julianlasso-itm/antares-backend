import { Injectable } from '@nestjs/common';
import { Customers } from '../../../common/modules/persistence/entities';
import { CustomersRepository } from '../../../common/modules/persistence/repositories';
import { BaseService } from '../../../common/services/service.abstract';

@Injectable()
export class CustomersService extends BaseService<
  Customers,
  CustomersRepository
> {
  constructor(protected readonly repository: CustomersRepository) {
    super(repository);
  }
}
