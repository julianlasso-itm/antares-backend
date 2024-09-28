import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customers } from '../../entities';
import { BaseRepository } from '../repository.abstract';

@Injectable()
class CustomersRepository extends BaseRepository<Customers> {
  constructor(
    @InjectRepository(Customers)
    protected readonly repository: Repository<Customers>,
  ) {
    super(repository);
  }
}

export default CustomersRepository;
