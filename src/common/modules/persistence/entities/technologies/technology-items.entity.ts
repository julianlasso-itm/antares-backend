import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { DomainKnowledge } from '../assessments';
import { TechnologyStack } from '../projects_management';
import { TechnologyTypes } from './technology-types.entity';

@Index('technology_items_tech_item_status_Idx', ['deletedAt', 'status'], {})
@Index('tech_technology_items_tech_type_id_Idx', ['technologyTypeId'], {})
@Index('pktech_technology_items', ['technologyItemId'], { unique: true })
@Index('technologies_tech_name_tech_deleted_at_Idx', ['name'], {
  unique: true,
  where: 'deletedAt IS NULL',
})
@Entity('tech_technology_items', { schema: 'technologies' })
export class TechnologyItems {
  @Column('character varying', {
    primary: true,
    name: 'tech_item_id',
    length: 26,
  })
  technologyItemId: string;

  @Column('character varying', { name: 'tech_type_id', length: 26 })
  technologyTypeId: string;

  @Column('character varying', { name: 'tech_item_name', length: 500 })
  name: string;

  @Column('character varying', {
    name: 'tech_item_description',
    nullable: true,
    length: 2048,
  })
  description: string | null;

  @Column('character varying', {
    name: 'tech_item_icon',
    nullable: true,
    length: 500,
  })
  icon: string | null;

  @Column('boolean', { name: 'tech_item_status', default: () => 'true' })
  status: boolean;

  @Column('timestamp without time zone', {
    name: 'tech_item_created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'tech_item_updated_at',
    nullable: true,
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'tech_item_deleted_at',
    nullable: true,
  })
  deletedAt: Date | null;

  @OneToMany(
    () => DomainKnowledge,
    (domainKnowledge) => domainKnowledge.techItem,
  )
  domainKnowledges: DomainKnowledge[];

  @OneToMany(
    () => TechnologyStack,
    (technologyStack) => technologyStack.technologyItem,
  )
  technologyStacks: TechnologyStack[];

  @ManyToOne(
    () => TechnologyTypes,
    (technologyTypes) => technologyTypes.technologyItems,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([
    { name: 'tech_type_id', referencedColumnName: 'technologyTypeId' },
  ])
  technologyType: TechnologyTypes;
}
