import { Column, Entity, Index, OneToMany } from 'typeorm';
import { ConfigurationPerLevel } from './configuration-per-level.entity';
import { DomainKnowledgeLevels } from './domain-knowledge-levels.entity';

@Index('levels_level_status_Idx', ['status', 'deletedAt'], {})
@Index('pkassmt_levels', ['levelId'], { unique: true })
@Index('levels_level_name_at_Idx', ['name'], {
  unique: true,
  where: 'level_deleted_at IS NULL',
})
@Entity('assmt_levels', {
  schema: 'assessments',
  comment: 'Niveles a usar en el sistema. Ejemplo: Junior, Middle y Senior',
})
export class Levels {
  @Column('character varying', {
    primary: true,
    name: 'level_id',
    length: 26,
    comment:
      'Identificador del nivel a usar en el sistema. Ejemplo: Junior, Middle o Senior',
  })
  levelId: string;

  @Column('character varying', {
    name: 'level_name',
    length: 30,
    comment: 'Nombre del nivel a usar. Ejemplo: Junior, Middle, Senior',
  })
  name: string;

  @Column('numeric', {
    name: 'level_weight',
    precision: 3,
    scale: 2,
    comment: 'Importancia del nivel. Máximo 1.00 mínimo 0.00',
  })
  weight: number;

  @Column('boolean', {
    name: 'level_status',
    default: () => 'true',
    comment: 'Estado del registro. True activo, False inactivo',
  })
  status: boolean;

  @Column('timestamp without time zone', {
    name: 'level_created_at',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha y hora de creación del registro',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'level_updated_at',
    nullable: true,
    comment: 'Fecha y hora de última actualización del registro',
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'level_deleted_at',
    nullable: true,
    comment: 'Fecha y hora de borrado del registro',
  })
  deletedAt: Date | null;

  @OneToMany(
    () => ConfigurationPerLevel,
    (configurationPerLevel) => configurationPerLevel.level,
    { cascade: true },
  )
  configurationPerLevels: ConfigurationPerLevel[];

  @OneToMany(
    () => DomainKnowledgeLevels,
    (domainKnowledgeLevels) => domainKnowledgeLevels.level,
    { cascade: true },
  )
  domainKnowledgeLevels: DomainKnowledgeLevels[];
}
