import { Customers } from '@entities/projects-management/customers.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '@repositories/repository.abstract';
import { Repository } from 'typeorm';

@Injectable()
class CustomersRepository extends BaseRepository<Customers> {
  constructor(
    @InjectRepository(Customers)
    readonly repository: Repository<Customers>,
  ) {
    super(repository);
  }
}

export default CustomersRepository;
