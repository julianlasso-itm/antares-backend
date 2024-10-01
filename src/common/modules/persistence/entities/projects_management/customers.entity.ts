import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Projects } from './projects.entity';

@Index('customers_customer_status_Idx', ['status', 'deletedAt'], {})
@Index('pkpm_customers', ['customerId'], {
  unique: true,
})
@Index('customers_cus_name_Idx', ['name'], {
  unique: true,
  where: 'deletedAt IS NULL',
})
@Entity('pm_customers', {
  schema: 'projects_management',
  comment: 'Clientes de la empresa',
})
export class Customers {
  @ApiProperty({
    description: 'Identificador del cliente',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @Column('character varying', {
    primary: true,
    name: 'cus_id',
    length: 26,
    comment: 'Identificador del cliente',
  })
  customerId: string;

  @ApiProperty({
    description: 'Nombre del cliente',
    example: 'Sofka',
    required: true,
    maxLength: 500,
    type: String,
  })
  @Column('character varying', {
    name: 'cus_name',
    length: 500,
    comment: 'Nombre del cliente',
  })
  name: string;

  @ApiProperty({
    description: 'Estado del registro. True activo, False inactivo',
    example: true,
    required: true,
    type: Boolean,
  })
  @Column('boolean', {
    name: 'cus_status',
    default: () => 'true',
    comment: 'Estado del registro. True activo, False inactivo',
  })
  status: boolean;

  @ApiProperty({
    description: 'Fecha y hora de creación del registro',
    example: '2023-03-30T12:00:00.000Z',
    required: true,
    type: Date,
  })
  @Column('timestamp without time zone', {
    name: 'cus_created_at',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha y hora de creación del registro',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha y hora de última actualización del registro',
    example: '2023-03-30T12:00:00.000Z',
    required: false,
    type: Date,
  })
  @Column('timestamp without time zone', {
    name: 'cus_updated_at',
    nullable: true,
    comment: 'Fecha y hora de última actualización del registro',
  })
  updatedAt: Date | null;

  @ApiProperty({
    description: 'Fecha y hora de borrado del registro',
    example: '2023-03-30T12:00:00.000Z',
    required: false,
    type: Date,
  })
  @Column('timestamp without time zone', {
    name: 'cus_deleted_at',
    nullable: true,
    comment: 'Fecha y hora de borrado del registro',
  })
  deletedAt: Date | null;

  @OneToMany(() => Projects, (projects) => projects.customer)
  projects: Projects[];
}
