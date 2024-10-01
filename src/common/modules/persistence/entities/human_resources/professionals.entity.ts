import { Column, Entity, Index, OneToMany } from 'typeorm';
import { RolePerProfessional } from '../projects_management';

@Index('professionals_pro_status_Idx', ['status', 'deletedAt'], {})
@Index('professionals_pro_full_name_Idx', ['name', 'deletedAt'], {})
@Index(
  'professionals_pro_document_type_pro_document_Idx',
  ['documentType', 'document'],
  { unique: true, where: 'deletedAt IS NULL' },
)
@Index('professionals_pro_email_Idx', ['email'], {
  unique: true,
  where: 'deletedAt IS NULL',
})
@Index('pkhr_professionals', ['professionalId'], { unique: true })
@Entity('hr_professionals', {
  schema: 'human_resources',
  comment:
    'Datos de los profesionales de la empresa, es decir, programadores y demás',
})
export class Professionals {
  @Column('character varying', {
    primary: true,
    name: 'pro_id',
    length: 26,
    comment: 'Identificador del profesional en el sistema',
  })
  professionalId: string;

  @Column('character varying', {
    name: 'pro_document_type',
    length: 2,
    comment:
      'Tipo de documento. CC = Cédula de Ciudadanía ; CE = Cédula de Extranjería',
  })
  documentType: string;

  @Column('character varying', {
    name: 'pro_document',
    length: 20,
    comment: 'Número de documento',
  })
  document: string;

  @Column('character varying', {
    name: 'pro_full_name',
    length: 500,
    comment: 'Nombre completo del profesional',
  })
  name: string;

  @Column('character varying', {
    name: 'pro_email',
    length: 500,
    comment: 'Correo electrónico del profesional',
  })
  email: string;

  @Column('character varying', {
    name: 'pro_photo',
    nullable: true,
    length: 1024,
    comment: 'Foto del profesional',
  })
  photo: string | null;

  @Column('boolean', {
    name: 'pro_status',
    default: () => 'true',
    comment: 'Estado del registro. True activo, False inactivo',
  })
  status: boolean;

  @Column('timestamp without time zone', {
    name: 'pro_created_at',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha y hora de creación del registro',
  })
  createdAt: Date;

  @Column('timestamp without time zone', {
    name: 'pro_updated_at',
    nullable: true,
    comment: 'Fecha y hora de última actualización del registro',
  })
  updatedAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'pro_deleted_at',
    nullable: true,
    comment: 'Fecha y hora de borrado del registro',
  })
  deletedAt: Date | null;

  @OneToMany(
    () => RolePerProfessional,
    (rolePerProfessional) => rolePerProfessional.professional,
  )
  rolePerProfessionals: RolePerProfessional[];
}
