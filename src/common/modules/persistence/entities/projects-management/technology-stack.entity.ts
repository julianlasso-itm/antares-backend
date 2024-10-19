import { TechnologyItems } from '@entities/technologies/technology-items.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Projects } from './projects.entity';
import { TechnologyPerRole } from './technology-per-role.entity';

@Index(
  'technology_stack_tech_item_id_project_id_Idx',
  ['projectId', 'technologyItemId'],
  { unique: true, where: 'ts_deleted_at IS NULL' },
)
@Index('technology_stack_ts_status_Idx', ['status', 'deletedAt'], {})
@Index('pkpm_technology_stack', ['technologyStackId'], { unique: true })
@Entity('pm_technology_stack', {
  schema: 'projects_management',
  comment: 'Stack tecnológico de un proyecto en un cliente',
})
export class TechnologyStack {
  @Column('character varying', {
    primary: true,
    name: 'ts_id',
    length: 26,
    comment: 'Identificador del stack tecnológico en un proyecto de un cliente',
  })
  technologyStackId: string;

  @Column('character varying', {
    name: 'tech_item_id',
    length: 26,
    comment:
      'Identificador de una tecnología en un stack tecnológico de un proyecto de un cliente',
  })
  technologyItemId: string;

  @Column('character varying', {
    name: 'project_id',
    length: 26,
    comment: 'Identificador del proyecto de un cliente',
  })
  projectId: string;

  @Column('numeric', {
    name: 'ts_weight',
    nullable: true,
    precision: 3,
    scale: 2,
    comment: 'Peso (importancia) de la tecnología ; puede ir de 0.00 a 1.00',
  })
  weight?: number | null;

  @Column('boolean', {
    name: 'ts_status',
    default: () => 'true',
    comment: 'Estado del registro. True activo, False inactivo',
  })
  status: boolean;

  @Column('timestamp without time zone', {
    name: 'ts_created_at',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha y hora de creación del registro',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'ts_updated_at',
    nullable: true,
    comment: 'Fecha y hora de última actualización del registro',
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'ts_deleted_at',
    nullable: true,
    comment: 'Fecha y hora de borrado del registro',
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
