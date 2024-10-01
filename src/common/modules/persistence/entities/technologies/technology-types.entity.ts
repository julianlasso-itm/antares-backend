import { Column, Entity, Index, OneToMany } from 'typeorm';
import { TechnologyItems } from './technology-items.entity';

@Index('technology_types_tech_type_status_Idx', ['status', 'deletedAt'], {})
@Index('pktech_technology_types', ['technologyTypeId'], { unique: true })
@Index('technology_types_tech_type_name_Idx', ['name'], {
  unique: true,
  where: 'deletedAt IS NULL',
})
@Entity('tech_technology_types', {
  schema: 'technologies',
  comment: 'Tipos de tecnologías',
})
export class TechnologyTypes {
  @Column('character varying', {
    primary: true,
    name: 'tech_type_id',
    length: 26,
    comment: 'Identificador del tipo de tecnología',
  })
  technologyTypeId: string;

  @Column('character varying', {
    name: 'tech_type_name',
    length: 500,
    comment: 'Nombre del tipo de tecnología',
  })
  name: string;

  @Column('character varying', {
    name: 'tech_type_description',
    nullable: true,
    length: 2048,
    comment: 'Descripción del tipo de tecnología',
  })
  description: string | null;

  @Column('boolean', {
    name: 'tech_type_status',
    default: () => 'true',
    comment: 'Estado del registro. True activo, False inactivo',
  })
  status: boolean;

  @Column('timestamp without time zone', {
    name: 'tech_type_created_at',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha y hora de creación del registro',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'tech_type_updated_at',
    nullable: true,
    comment: 'Fecha y hora de última actualización del registro',
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'tech_type_deleted_at',
    nullable: true,
    comment: 'Fecha y hora de borrado del registro',
  })
  deletedAt: Date | null;

  @OneToMany(
    () => TechnologyItems,
    (technologyItems) => technologyItems.technologyType,
  )
  technologyItems: TechnologyItems[];
}
