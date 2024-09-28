import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { TechnologyItems } from '../technologies';
import { Projects } from './projects.entity';
import { TechnologyPerRole } from './technology-per-role.entity';

@Index(
  'technology_stack_tech_item_id_project_id_Idx',
  ['projectId', 'technologyItemId'],
  { unique: true },
)
@Index('technology_stack_ts_status_Idx', ['deletedAt', 'status'], {})
@Index('pkpm_technology_stack', ['technologyStackId'], { unique: true })
@Entity('pm_technology_stack', { schema: 'projects_management' })
export class TechnologyStack {
  @Column('character varying', { primary: true, name: 'ts_id', length: 26 })
  technologyStackId: string;

  @Column('character varying', { name: 'tech_item_id', length: 26 })
  technologyItemId: string;

  @Column('character varying', { name: 'project_id', length: 26 })
  projectId: string;

  @Column('numeric', {
    name: 'ts_weight',
    nullable: true,
    precision: 3,
    scale: 2,
  })
  weight: number | null;

  @Column('boolean', { name: 'ts_status', default: () => 'true' })
  status: boolean;

  @Column('timestamp without time zone', {
    name: 'ts_created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'ts_updated_at',
    nullable: true,
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'ts_deleted_at',
    nullable: true,
  })
  deletedAt: Date | null;

  @OneToMany(
    () => TechnologyPerRole,
    (technologyPerRole) => technologyPerRole.technologyStack,
  )
  technologyPerRoles: TechnologyPerRole[];

  @ManyToOne(() => Projects, (projects) => projects.technologyStacks, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'project_id', referencedColumnName: 'projectId' }])
  project: Projects;

  @ManyToOne(
    () => TechnologyItems,
    (techTechnologyItems) => techTechnologyItems.technologyStacks,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([
    { name: 'tech_item_id', referencedColumnName: 'technologyItemId' },
  ])
  technologyItem: TechnologyItems;
}
