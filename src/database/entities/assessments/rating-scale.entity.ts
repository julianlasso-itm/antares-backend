import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { ConfigurationLevels } from './configuration-levels.entity';

@Index('rating_scale_cnf_lvl_id_Idx', ['configurationLevelId', 'deletedAt'], {})
@Index(
  'rating_scale_cnf_lvl_id_rc_name_Idx',
  ['configurationLevelId', 'name'],
  { unique: true, where: 'rc_deleted_at IS NULL' },
)
@Index('rc_rc_status_Idx', ['status', 'deletedAt'], {})
@Index('pkassmt_rating_scale', ['ratingScaleId'], { unique: true })
@Entity('assmt_rating_scale', {
  schema: 'assessments',
  comment: 'Escala de calificación en una configuración del sistema',
})
export class RatingScale {
  @Column('character varying', {
    primary: true,
    name: 'rc_id',
    length: 26,
    comment: 'Identificador de la escala a usar en un nivel',
  })
  ratingScaleId: string;

  @Column('character varying', {
    name: 'cnf_lvl_id',
    length: 26,
    comment:
      'Identificador de la configuración usada con referencia a los niveles usados en el sistema',
  })
  configurationLevelId: string;

  @Column('character varying', {
    name: 'rc_name',
    length: 80,
    comment:
      'Nombre de la escala a usar. Ejemplo: No conoce, Conoce, Comprende, Practica, Domina, Experto',
  })
  name: string;

  @Column('character varying', {
    name: 'rc_description',
    length: 500,
    comment: 'Descripción de la escala',
  })
  description: string;

  @Column('numeric', {
    name: 'rc_value',
    precision: 3,
    scale: 2,
    comment:
      'Valor de la escala 0.00 a 5.00 ; Se puede usar máximo 2 decimales',
  })
  value: number;

  @Column('integer', {
    name: 'rc_position',
    comment: 'Posición de la escala. Sólo números enteros',
  })
  position: number;

  @Column('boolean', {
    name: 'rc_status',
    default: () => 'true',
    comment: 'Estado del registro. True activo, False inactivo',
  })
  status: boolean;

  @Column('timestamp without time zone', {
    name: 'rc_created_at',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha y hora de creación del registro',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'rc_updated_at',
    nullable: true,
    comment: 'Fecha y hora de última actualización del registro',
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'rc_deleted_at',
    nullable: true,
    comment: 'Fecha y hora de borrado del registro',
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
