import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Customers } from './customers.entity';
import { TechnologyStack } from './technology-stack.entity';

@Index('projects_project_name_customer_id_Idx', ['customerId', 'name'], {
  unique: true,
  where: 'project_deleted_at IS NULL',
})
@Index('projects_customers_id_Idx', ['customerId'], {})
@Index('projects_project_status_Idx', ['status', 'deletedAt'], {})
@Index('pkpm_projects', ['projectId'], { unique: true })
@Entity('pm_projects', {
  schema: 'projects_management',
  comment: 'Proyectos de un cliente',
})
export class Projects {
  @Column('character varying', {
    primary: true,
    name: 'project_id',
    length: 26,
    comment: 'Identificador del proyecto de un cliente',
  })
  projectId: string;

  @Column('character varying', {
    name: 'customer_id',
    length: 26,
    comment: 'Identificador del cliente',
  })
  customerId: string;

  @Column('character varying', {
    name: 'project_name',
    length: 500,
    comment: 'Nombre del proyecto',
  })
  name: string;

  @Column('boolean', {
    name: 'project_status',
    default: () => 'true',
    comment: 'Estado del registro. True activo, False inactivo',
  })
  status: boolean;

  @Column('timestamp without time zone', {
    name: 'project_created_at',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha y hora de creación del registro',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'project_updated_at',
    nullable: true,
    comment: 'Fecha y hora de última actualización del registro',
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'project_deleted_at',
    nullable: true,
    comment: 'Fecha y hora de borrado del registro',
  })
  deletedAt: Date | null;

  @ManyToOne(() => Customers, (customers) => customers.projects, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'customer_id', referencedColumnName: 'customerId' }])
  customer: Customers;

  @OneToMany(
    () => TechnologyStack,
    (technologyStack) => technologyStack.project,
  )
  technologyStacks: TechnologyStack[];
}
