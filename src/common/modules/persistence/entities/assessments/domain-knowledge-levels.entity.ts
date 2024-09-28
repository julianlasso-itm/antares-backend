import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ConfigurationLevels } from './configuration-levels.entity';
import { DomainKnowledge } from './domain-knowledge.entity';
import { DomainQuestionsAnswers } from './domain-questions-answers.entity';
import { Levels } from './levels.entity';

@Index(
  'domain_knowledge_levels_dk_id_cnf_lvl_id_level_id_Idx',
  ['configurationLevelId', 'domainKnowledgeId', 'levelId'],
  { unique: true },
)
@Index('domain_knowledge_levels_dk_lvl_status_Idx', ['deletedAt', 'status'], {})
@Index('pkassmt_domain_knowledge_levels', ['domainKnowledgeLevelId'], {
  unique: true,
})
@Entity('assmt_domain_knowledge_levels', { schema: 'assessments' })
export class DomainKnowledgeLevels {
  @Column('character varying', { primary: true, name: 'dk_lvl_id', length: 26 })
  domainKnowledgeLevelId: string;

  @Column('character varying', { name: 'dk_id', length: 26 })
  domainKnowledgeId: string;

  @Column('character varying', { name: 'cnf_lvl_id', length: 26 })
  configurationLevelId: string;

  @Column('character varying', { name: 'level_id', length: 26 })
  levelId: string;

  @Column('boolean', { name: 'dk_lvl_status', default: () => 'true' })
  status: boolean;

  @Column('timestamp without time zone', {
    name: 'dk_lvl_created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'dk_lvl_updated_at',
    nullable: true,
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'dk_lvl_deleted_at',
    nullable: true,
  })
  deletedAt: Date | null;

  @ManyToOne(
    () => ConfigurationLevels,
    (configurationLevels) => configurationLevels.domainKnowledgeLevels,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([
    { name: 'cnf_lvl_id', referencedColumnName: 'configurationLevelId' },
  ])
  configurationLevel: ConfigurationLevels;

  @ManyToOne(
    () => DomainKnowledge,
    (domainKnowledge) => domainKnowledge.assmtDomainKnowledgeLevels,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([{ name: 'dk_id', referencedColumnName: 'domainKnowledgeId' }])
  domainKnowledge: DomainKnowledge;

  @ManyToOne(() => Levels, (levels) => levels.domainKnowledgeLevels, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'level_id', referencedColumnName: 'levelId' }])
  level: Levels;

  @OneToMany(
    () => DomainQuestionsAnswers,
    (domainQuestionsAnswers) => domainQuestionsAnswers.domainKnowledgeLevel,
  )
  domainQuestionsAnswers: DomainQuestionsAnswers[];
}
