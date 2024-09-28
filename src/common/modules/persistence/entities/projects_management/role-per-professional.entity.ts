import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Assessments } from '../assessments';
import { Professionals } from '../human_resources';
import { Roles } from './roles.entity';

@Index(
  'role_per_professional_professional_id_role_id_Idx',
  ['professionalId', 'roleId'],
  { unique: true },
)
@Index('role_per_professional_rpp_status_Idx', ['deletedAt', 'status'], {})
@Index('pkpm_role_per_professional', ['rolePerProfessionalId'], {
  unique: true,
})
@Entity('pm_role_per_professional', { schema: 'projects_management' })
export class RolePerProfessional {
  @Column('character varying', { primary: true, name: 'rpp_id', length: 26 })
  rolePerProfessionalId: string;

  @Column('character varying', { name: 'professional_id', length: 26 })
  professionalId: string;

  @Column('character varying', { name: 'role_id', length: 26 })
  roleId: string;

  @Column('timestamp without time zone', { name: 'rpp_start_date' })
  startDate: Date;

  @Column('timestamp without time zone', {
    name: 'rpp_end_date',
    nullable: true,
  })
  endDate: Date | null;

  @Column('boolean', { name: 'rpp_status', default: () => 'true' })
  status: boolean;

  @Column('timestamp without time zone', {
    name: 'rpp_created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'rpp_updated_at',
    nullable: true,
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'rpp_deleted_at',
    nullable: true,
  })
  deletedAt: Date | null;

  @OneToMany(
    () => Assessments,
    (assmtAssessments) => assmtAssessments.rolePerProfessional,
  )
  assessments: Assessments[];

  @ManyToOne(
    () => Professionals,
    (professionals) => professionals.rolePerProfessionals,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([
    { name: 'professional_id', referencedColumnName: 'professionalId' },
  ])
  professional: Professionals;

  @ManyToOne(() => Roles, (roles) => roles.rolePerProfessionals, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'role_id', referencedColumnName: 'roleId' }])
  role: Roles;
}
