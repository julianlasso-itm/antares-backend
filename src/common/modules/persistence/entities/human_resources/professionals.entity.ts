import { Column, Entity, Index, OneToMany } from 'typeorm';
import { RolePerProfessional } from '../projects_management';

@Index('professionals_pro_status_Idx', ['deletedAt', 'status'], {})
@Index('professionals_pro_full_name_Idx', ['deletedAt', 'name'], {})
@Index(
  'professionals_pro_document_type_pro_document_Idx',
  ['document', 'documentType'],
  { unique: true },
)
@Index('professionals_pro_email_Idx', ['email'], { unique: true })
@Index('pkhr_professionals', ['professionalId'], { unique: true })
@Entity('hr_professionals', { schema: 'human_resources' })
export class Professionals {
  @Column('character varying', { primary: true, name: 'pro_id', length: 26 })
  professionalId: string;

  @Column('character varying', { name: 'pro_document_type', length: 2 })
  documentType: string;

  @Column('character varying', { name: 'pro_document', length: 20 })
  document: string;

  @Column('character varying', { name: 'pro_full_name', length: 500 })
  name: string;

  @Column('character varying', { name: 'pro_email', length: 500 })
  email: string;

  @Column('character varying', {
    name: 'pro_photo',
    nullable: true,
    length: 1024,
  })
  photo: string | null;

  @Column('boolean', { name: 'pro_status', default: () => 'true' })
  status: boolean;

  @Column('timestamp without time zone', {
    name: 'pro_created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'pro_updated_at',
    nullable: true,
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'pro_deleted_at',
    nullable: true,
  })
  deletedAt: Date | null;

  @OneToMany(
    () => RolePerProfessional,
    (rolePerProfessional) => rolePerProfessional.professional,
  )
  rolePerProfessionals: RolePerProfessional[];
}
