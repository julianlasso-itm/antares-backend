import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Projects } from './projects.entity';

@Index('customers_customer_status_Idx', ['status', 'deletedAt'], {})
@Index('pkpm_customers', ['customerId'], {
  unique: true,
})
@Index('customers_cus_name_Idx', ['name'], {
  unique: true,
  where: 'cus_deleted_at IS NULL',
})
@Entity('pm_customers', {
  schema: 'projects_management',
  comment: 'Clientes de la empresa',
})
export class Customers {
  @Column('character varying', {
    primary: true,
    name: 'cus_id',
    length: 26,
    comment: 'Identificador del cliente',
  })
  customerId: string;

  @Column('character varying', {
    name: 'cus_name',
    length: 500,
    comment: 'Nombre del cliente',
  })
  name: string;

  @Column('boolean', {
    name: 'cus_status',
    default: () => 'true',
    comment: 'Estado del registro. True activo, False inactivo',
  })
  status: boolean;

  @Column('timestamp without time zone', {
    name: 'cus_created_at',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha y hora de creación del registro',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'cus_updated_at',
    nullable: true,
    comment: 'Fecha y hora de última actualización del registro',
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'cus_deleted_at',
    nullable: true,
    comment: 'Fecha y hora de borrado del registro',
  })
  deletedAt: Date | null;

  @OneToMany(() => Projects, (projects) => projects.customer)
  projects: Projects[];
}
