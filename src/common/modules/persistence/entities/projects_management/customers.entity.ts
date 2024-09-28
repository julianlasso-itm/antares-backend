import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Projects } from './projects.entity';

@Index('customers_customer_status_Idx', ['deletedAt', 'status'], {})
@Index('pkpm_customers', ['customerId'], { unique: true })
@Index('customers_cus_name_Idx', ['name'], { unique: true })
@Entity('pm_customers', { schema: 'projects_management' })
export class Customers {
  @Column('character varying', { primary: true, name: 'cus_id', length: 26 })
  customerId: string;

  @Column('character varying', { name: 'cus_name', length: 500 })
  name: string;

  @Column('boolean', { name: 'cus_status', default: () => 'true' })
  status: boolean;

  @Column('timestamp without time zone', {
    name: 'cus_created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'cus_updated_at',
    nullable: true,
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'cus_deleted_at',
    nullable: true,
  })
  deletedAt: Date | null;

  @OneToMany(() => Projects, (projects) => projects.customer)
  projects: Projects[];
}
