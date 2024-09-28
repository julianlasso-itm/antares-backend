import { Column, Entity, Index, OneToMany } from 'typeorm';
import { TechnologyItems } from './technology-items.entity';

@Index('technology_types_tech_type_status_Idx', ['deletedAt', 'status'], {})
@Index('pktech_technology_types', ['technologyTypeId'], { unique: true })
@Index('technology_types_tech_type_name_Idx', ['name'], {
  unique: true,
})
@Entity('tech_technology_types', { schema: 'technologies' })
export class TechnologyTypes {
  @Column('character varying', {
    primary: true,
    name: 'tech_type_id',
    length: 26,
  })
  technologyTypeId: string;

  @Column('character varying', { name: 'tech_type_name', length: 500 })
  name: string;

  @Column('character varying', {
    name: 'tech_type_description',
    nullable: true,
    length: 2048,
  })
  description: string | null;

  @Column('boolean', { name: 'tech_type_status', default: () => 'true' })
  status: boolean;

  @Column('timestamp without time zone', {
    name: 'tech_type_created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'tech_type_updated_at',
    nullable: true,
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'tech_type_deleted_at',
    nullable: true,
  })
  deletedAt: Date | null;

  @OneToMany(
    () => TechnologyItems,
    (technologyItems) => technologyItems.technologyType,
  )
  technologyItems: TechnologyItems[];
}
