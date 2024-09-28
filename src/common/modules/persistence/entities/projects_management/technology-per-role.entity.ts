import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Roles } from './roles.entity';
import { TechnologyStack } from './technology-stack.entity';

@Index(
  'technology_per_role_ts_id_role_id_Idx',
  ['roleId', 'technologyStackId'],
  {
    unique: true,
  },
)
@Index('technology_per_role_tpr_status_Idx', ['deletedAt', 'status'], {})
@Index('pkpm_technology_per_role', ['technologyPerRoleId'], { unique: true })
@Entity('pm_technology_per_role', { schema: 'projects_management' })
export class TechnologyPerRole {
  @Column('character varying', { primary: true, name: 'tpr_id', length: 26 })
  technologyPerRoleId: string;

  @Column('character varying', { name: 'ts_id', length: 26 })
  technologyStackId: string;

  @Column('character varying', { name: 'role_id', length: 26 })
  roleId: string;

  @Column('boolean', { name: 'tpr_status', default: () => 'true' })
  status: boolean;

  @Column('timestamp without time zone', {
    name: 'tpr_created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'tpr_updated_at',
    nullable: true,
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'tpr_deleted_at',
    nullable: true,
  })
  deletedAt: Date | null;

  @ManyToOne(() => Roles, (roles) => roles.technologyPerRoles, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'role_id', referencedColumnName: 'roleId' }])
  role: Roles;

  @ManyToOne(
    () => TechnologyStack,
    (technologyStack) => technologyStack.technologyPerRoles,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([{ name: 'ts_id', referencedColumnName: 'technologyStackId' }])
  technologyStack: TechnologyStack;
}
