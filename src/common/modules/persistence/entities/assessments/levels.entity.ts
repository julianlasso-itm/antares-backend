import { Column, Entity, Index, OneToMany } from 'typeorm';
import { ConfigurationPerLevel } from './configuration-per-level.entity';
import { DomainKnowledgeLevels } from './domain-knowledge-levels.entity';

@Index('levels_level_status_Idx', ['deletedAt', 'status'], {})
@Index('pkassmt_levels', ['levelId'], { unique: true })
@Index('levels_level_name_at_Idx', ['name'], { unique: true })
@Entity('assmt_levels', { schema: 'assessments' })
export class Levels {
  @Column('character varying', { primary: true, name: 'level_id', length: 26 })
  levelId: string;

  @Column('character varying', { name: 'level_name', length: 30 })
  name: string;

  @Column('boolean', { name: 'level_status', default: () => 'true' })
  status: boolean;

  @Column('timestamp without time zone', {
    name: 'level_created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'level_updated_at',
    nullable: true,
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'level_deleted_at',
    nullable: true,
  })
  deletedAt: Date | null;

  @OneToMany(
    () => ConfigurationPerLevel,
    (configurationPerLevel) => configurationPerLevel.level,
  )
  configurationPerLevels: ConfigurationPerLevel[];

  @OneToMany(
    () => DomainKnowledgeLevels,
    (domainKnowledgeLevels) => domainKnowledgeLevels.level,
  )
  domainKnowledgeLevels: DomainKnowledgeLevels[];
}
