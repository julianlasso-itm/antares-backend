import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { ConfigurationLevels } from './configuration-levels.entity';
import { Levels } from './levels.entity';

@Index(
  'configuration_per_level_cnf_lvl_id_Idx',
  ['configurationLevelId', 'levelId'],
  { unique: true },
)
@Index('configuration_per_level_cpl_status_Idx', ['deletedAt', 'status'], {})
@Index('pkassmt_configuration_per_level', ['configurationPerLevelId'], {
  unique: true,
})
@Entity('assmt_configuration_per_level', { schema: 'assessments' })
export class ConfigurationPerLevel {
  @Column('character varying', { primary: true, name: 'cpl_id', length: 26 })
  configurationPerLevelId: string;

  @Column('character varying', { name: 'cnf_lvl_id', length: 26 })
  configurationLevelId: string;

  @Column('character varying', { name: 'level_id', length: 26 })
  levelId: string;

  @Column('integer', { name: 'cpl_position' })
  position: number;

  @Column('boolean', { name: 'cpl_status', default: () => 'true' })
  status: boolean;

  @Column('timestamp without time zone', {
    name: 'cpl_created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'cpl_updated_at',
    nullable: true,
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'cpl_deleted_at',
    nullable: true,
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
