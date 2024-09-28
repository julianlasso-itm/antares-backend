import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { ConfigurationLevels } from './configuration-levels.entity';

@Index('rating_scale_cnf_lvl_id_Idx', ['configurationLevelId', 'deletedAt'], {})
@Index(
  'rating_scale_cnf_lvl_id_rc_name_Idx',
  ['configurationLevelId', 'name'],
  { unique: true },
)
@Index('rc_rc_status_Idx', ['deletedAt', 'status'], {})
@Index('pkassmt_rating_scale', ['ratingScaleId'], { unique: true })
@Entity('assmt_rating_scale', { schema: 'assessments' })
export class RatingScale {
  @Column('character varying', { primary: true, name: 'rc_id', length: 26 })
  ratingScaleId: string;

  @Column('character varying', { name: 'cnf_lvl_id', length: 26 })
  configurationLevelId: string;

  @Column('character varying', { name: 'rc_name', length: 80 })
  name: string;

  @Column('character varying', { name: 'rc_description', length: 500 })
  description: string;

  @Column('numeric', { name: 'rc_value', precision: 3, scale: 2 })
  value: number;

  @Column('integer', { name: 'rc_position' })
  position: number;

  @Column('boolean', { name: 'rc_status', default: () => 'true' })
  status: boolean;

  @Column('timestamp without time zone', {
    name: 'rc_created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'rc_updated_at',
    nullable: true,
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'rc_deleted_at',
    nullable: true,
  })
  deletedAt: Date | null;

  @ManyToOne(
    () => ConfigurationLevels,
    (configurationLevels) => configurationLevels.ratingScales,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([
    { name: 'cnf_lvl_id', referencedColumnName: 'configurationLevelId' },
  ])
  configurationLevel: ConfigurationLevels;
}
