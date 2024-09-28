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
})
@Index('projects_customers_id_Idx', ['customerId'], {})
@Index('projects_project_status_Idx', ['deletedAt', 'status'], {})
@Index('pkpm_projects', ['projectId'], { unique: true })
@Entity('pm_projects', { schema: 'projects_management' })
export class Projects {
  @Column('character varying', {
    primary: true,
    name: 'project_id',
    length: 26,
  })
  projectId: string;

  @Column('character varying', { name: 'customer_id', length: 26 })
  customerId: string;

  @Column('character varying', { name: 'project_name', length: 500 })
  name: string;

  @Column('boolean', { name: 'project_status', default: () => 'true' })
  status: boolean;

  @Column('timestamp without time zone', {
    name: 'project_created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'project_updated_at',
    nullable: true,
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'project_deleted_at',
    nullable: true,
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
