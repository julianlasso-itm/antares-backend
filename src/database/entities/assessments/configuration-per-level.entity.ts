import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { ConfigurationLevels } from './configuration-levels.entity';
import { Levels } from './levels.entity';

@Index(
  'configuration_per_level_cnf_lvl_id_Idx',
  ['configurationLevelId', 'levelId'],
  { unique: true, where: 'cpl_deleted_at IS NULL' },
)
@Index('configuration_per_level_cpl_status_Idx', ['status', 'deletedAt'], {})
@Index('pkassmt_configuration_per_level', ['configurationPerLevelId'], {
  unique: true,
})
@Entity('assmt_configuration_per_level', {
  schema: 'assessments',
  comment: 'Niveles a usar en una configuración para el sistema en general',
})
export class ConfigurationPerLevel {
  @Column('character varying', {
    primary: true,
    name: 'cpl_id',
    length: 26,
    comment: 'Identificador del nivel en una configuración',
  })
  configurationPerLevelId: string;

  @Column('character varying', {
    name: 'cnf_lvl_id',
    length: 26,
    comment: 'Identificador de la configuración usada',
  })
  configurationLevelId: string;

  @Column('character varying', {
    name: 'level_id',
    length: 26,
    comment:
      'Identificador del nivel a usar en el sistema. Ejemplo: Junior, Middle o Senior',
  })
  levelId: string;

  @Column('integer', {
    name: 'cpl_position',
    comment: 'Posición del nivel en la configuración. Ejemplo 1, 2, 3',
  })
  position: number;

  @Column('boolean', {
    name: 'cpl_status',
    default: () => 'true',
    comment: 'Estado del registro. True activo, False inactivo',
  })
  status: boolean;

  @Column('timestamp without time zone', {
    name: 'cpl_created_at',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha y hora de creación del registro',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'cpl_updated_at',
    nullable: true,
    comment: 'Fecha y hora de última actualización del registro',
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'cpl_deleted_at',
    nullable: true,
    comment: 'Fecha y hora de borrado del registro',
  })
  deletedAt: Date | null;

  @ManyToOne(
    () => ConfigurationLevels,
    (configurationLevels) => configurationLevels.configurationPerLevels,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([
    { name: 'cnf_lvl_id', referencedColumnName: 'configurationLevelId' },
  ])
  configurationLevel: ConfigurationLevels;

  @ManyToOne(() => Levels, (levels) => levels.configurationPerLevels, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'level_id', referencedColumnName: 'levelId' }])
  level: Levels;
}
