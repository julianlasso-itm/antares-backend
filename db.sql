/************ Update: Schemas ***************/

/* Add Schema: assessments */
CREATE SCHEMA IF NOT EXISTS assessments;

/* Add Schema: human_resources */
CREATE SCHEMA IF NOT EXISTS human_resources;

/* Add Schema: knowledge_gaps */
CREATE SCHEMA IF NOT EXISTS knowledge_gaps;

/* Add Schema: projects_management */
CREATE SCHEMA IF NOT EXISTS projects_management;

/* Add Schema: security */
CREATE SCHEMA IF NOT EXISTS security;

/* Add Schema: technologies */
CREATE SCHEMA IF NOT EXISTS technologies;


/************ Update: Tables ***************/

/******************** Add Table: assessments.assmt_assessments ************************/

/* Build Table Structure */
CREATE TABLE assessments.assmt_assessments
(
	asmt_id VARCHAR(26) NOT NULL,
	rpp_id VARCHAR(26) NOT NULL,
	user_id VARCHAR(26) NOT NULL,
	asmt_observations VARCHAR(8192) NULL,
	asmt_score NUMERIC(3, 2) DEFAULT 0.00 NOT NULL,
	asmt_start_date TIMESTAMP NOT NULL,
	asmt_end_date TIMESTAMP NULL,
	asmt_status BOOL DEFAULT true NOT NULL,
	asmt_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	asmt_updated_at TIMESTAMP NULL,
	asmt_deleted_at TIMESTAMP NULL
);

/* Add Primary Key */
ALTER TABLE assessments.assmt_assessments ADD CONSTRAINT pkassmt_assessments
	PRIMARY KEY (asmt_id);

/* Add Comments */
COMMENT ON COLUMN assessments.assmt_assessments.asmt_id IS 'Identificador del assessment';

COMMENT ON COLUMN assessments.assmt_assessments.rpp_id IS 'Identificador del rol y el profesional en el sistema';

COMMENT ON COLUMN assessments.assmt_assessments.user_id IS 'Usuario del sistema que realizó el assessment';

COMMENT ON COLUMN assessments.assmt_assessments.asmt_observations IS 'Observaciones generales del assessment';

COMMENT ON COLUMN assessments.assmt_assessments.asmt_score IS 'Puntaje total del assessment. Desde mínimo 0.00 a 5.00 máximo';

COMMENT ON COLUMN assessments.assmt_assessments.asmt_start_date IS 'Fecha y hora en que inició el assessment';

COMMENT ON COLUMN assessments.assmt_assessments.asmt_end_date IS 'Fecha y hora en que terminó el assessment';

COMMENT ON COLUMN assessments.assmt_assessments.asmt_status IS 'Estado del registro. True activo, False inactivo';

COMMENT ON COLUMN assessments.assmt_assessments.asmt_created_at IS 'Fecha y hora de creación del registro';

COMMENT ON COLUMN assessments.assmt_assessments.asmt_updated_at IS 'Fecha y hora de última actualización del registro';

COMMENT ON COLUMN assessments.assmt_assessments.asmt_deleted_at IS 'Fecha y hora de borrado del registro';

COMMENT ON TABLE assessments.assmt_assessments IS 'Evaluaciones realizadas a los profesionales bajo un rol en un proyecto específico';

/* Add Indexes */
CREATE INDEX "assessments_asmt_status_Idx" ON assessments.assmt_assessments (asmt_status, asmt_deleted_at);

CREATE INDEX "assessments_rpp_id_Idx" ON assessments.assmt_assessments (rpp_id, asmt_deleted_at);

CREATE INDEX "assessments_user_id_Idx" ON assessments.assmt_assessments (user_id, asmt_deleted_at);

CREATE INDEX "assessments_user_id_rpp_id_Idx" ON assessments.assmt_assessments (user_id, rpp_id, asmt_deleted_at);


/******************** Add Table: assessments.assmt_configuration_levels ************************/

/* Build Table Structure */
CREATE TABLE assessments.assmt_configuration_levels
(
	cnf_lvl_id VARCHAR(26) NOT NULL,
	cnf_lvl_name VARCHAR(50) NOT NULL,
	cnf_lvl_status BOOL DEFAULT true NOT NULL,
	cnf_lvl_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	cnf_lvl_updated_at TIMESTAMP NULL,
	cnf_lvl_deleted_at TIMESTAMP NULL
);

/* Add Primary Key */
ALTER TABLE assessments.assmt_configuration_levels ADD CONSTRAINT pkassmt_configuration_levels
	PRIMARY KEY (cnf_lvl_id);

/* Add Comments */
COMMENT ON COLUMN assessments.assmt_configuration_levels.cnf_lvl_id IS 'Identificador de la configuración usada con referencia a los niveles usado en el sistema';

COMMENT ON COLUMN assessments.assmt_configuration_levels.cnf_lvl_name IS 'Nombre de la configuración';

COMMENT ON COLUMN assessments.assmt_configuration_levels.cnf_lvl_status IS 'Estado del registro. True activo, False inactivo';

COMMENT ON COLUMN assessments.assmt_configuration_levels.cnf_lvl_created_at IS 'Fecha y hora de creación del registro';

COMMENT ON COLUMN assessments.assmt_configuration_levels.cnf_lvl_updated_at IS 'Fecha y hora de última actualización del registro';

COMMENT ON COLUMN assessments.assmt_configuration_levels.cnf_lvl_deleted_at IS 'Fecha y hora de borrado del registro';

COMMENT ON TABLE assessments.assmt_configuration_levels IS 'Configuración para los niveles del sistema. Ejemplo Junior, Middle y Senior';

/* Add Indexes */
CREATE INDEX "configuration_level_cnf_lvl_status_Idx" ON assessments.assmt_configuration_levels (cnf_lvl_status, cnf_lvl_deleted_at);


/******************** Add Table: assessments.assmt_configuration_per_level ************************/

/* Build Table Structure */
CREATE TABLE assessments.assmt_configuration_per_level
(
	cpl_id VARCHAR(26) NOT NULL,
	cnf_lvl_id VARCHAR(26) NOT NULL,
	level_id VARCHAR(26) NOT NULL,
	cpl_position INTEGER NOT NULL,
	cpl_status BOOL DEFAULT true NOT NULL,
	cpl_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	cpl_updated_at TIMESTAMP NULL,
	cpl_deleted_at TIMESTAMP NULL
);

/* Add Primary Key */
ALTER TABLE assessments.assmt_configuration_per_level ADD CONSTRAINT pkassmt_configuration_per_level
	PRIMARY KEY (cpl_id);

/* Add Comments */
COMMENT ON COLUMN assessments.assmt_configuration_per_level.cpl_id IS 'Identificador del nivel en una configuración';

COMMENT ON COLUMN assessments.assmt_configuration_per_level.cnf_lvl_id IS 'Identificador de la configuración usada con referencia a los niveles usado en el sistema';

COMMENT ON COLUMN assessments.assmt_configuration_per_level.level_id IS 'Identificador del nivel a usar en el sistema. Ejemplo: Junior, Middle o Senior';

COMMENT ON COLUMN assessments.assmt_configuration_per_level.cpl_position IS 'Posición del nivel en la configuración. Ejemplo 1, 2, 3';

COMMENT ON COLUMN assessments.assmt_configuration_per_level.cpl_status IS 'Estado del registro. True activo, False inactivo';

COMMENT ON COLUMN assessments.assmt_configuration_per_level.cpl_created_at IS 'Fecha y hora de creación del registro';

COMMENT ON COLUMN assessments.assmt_configuration_per_level.cpl_updated_at IS 'Fecha y hora de última actualización del registro';

COMMENT ON COLUMN assessments.assmt_configuration_per_level.cpl_deleted_at IS 'Fecha y hora de borrado del registro';

COMMENT ON TABLE assessments.assmt_configuration_per_level IS 'Niveles a usar en una configuración para el sistema en general';

/* Add Indexes */
CREATE UNIQUE INDEX "configuration_per_level_cnf_lvl_id_Idx" ON assessments.assmt_configuration_per_level (cnf_lvl_id, level_id) WHERE cpl_deleted_at IS NULL;

CREATE INDEX "configuration_per_level_cpl_status_Idx" ON assessments.assmt_configuration_per_level (cpl_status, cpl_deleted_at);


/******************** Add Table: assessments.assmt_domain_assessment_scores ************************/

/* Build Table Structure */
CREATE TABLE assessments.assmt_domain_assessment_scores
(
	das_id VARCHAR(26) NOT NULL,
	asmt_id VARCHAR(26) NOT NULL,
	dk_id VARCHAR(26) NOT NULL,
	cnf_lvl_id VARCHAR(26) NOT NULL,
	das_observations VARCHAR(8192) NULL,
	das_score NUMERIC(3, 2) NOT NULL,
	das_status BOOL DEFAULT true NOT NULL,
	das_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	das_updated_at TIMESTAMP NULL,
	das_deleted_at TIMESTAMP NULL
);

/* Add Primary Key */
ALTER TABLE assessments.assmt_domain_assessment_scores ADD CONSTRAINT pkassmt_domain_assessment_scores
	PRIMARY KEY (das_id);

/* Add Comments */
COMMENT ON COLUMN assessments.assmt_domain_assessment_scores.das_id IS 'Identificador del puntaje del dominio de conocimiento en un assessment';

COMMENT ON COLUMN assessments.assmt_domain_assessment_scores.asmt_id IS 'Identificador del assessment';

COMMENT ON COLUMN assessments.assmt_domain_assessment_scores.dk_id IS 'Identificador del dominio de conocimiento';

COMMENT ON COLUMN assessments.assmt_domain_assessment_scores.cnf_lvl_id IS 'Identificador de la configuración usada con referencia a los niveles usado en el sistema';

COMMENT ON COLUMN assessments.assmt_domain_assessment_scores.das_observations IS 'Observaciones dominio de conocimiento al ser evaluado';

COMMENT ON COLUMN assessments.assmt_domain_assessment_scores.das_score IS 'Puntaje del dominio del conocimiento al ser evaluado. Números entre 0.00 a 5.00';

COMMENT ON COLUMN assessments.assmt_domain_assessment_scores.das_status IS 'Estado del registro. True activo, False inactivo';

COMMENT ON COLUMN assessments.assmt_domain_assessment_scores.das_created_at IS 'Fecha y hora de creación del registro';

COMMENT ON COLUMN assessments.assmt_domain_assessment_scores.das_updated_at IS 'Fecha y hora de última actualización del registro';

COMMENT ON COLUMN assessments.assmt_domain_assessment_scores.das_deleted_at IS 'Fecha y hora de borrado del registro';

COMMENT ON TABLE assessments.assmt_domain_assessment_scores IS 'Puntaje del dominio de conocimiento de una tecnología en un assessment de un profesional con un rol específico en un proyecto de un cliente';

/* Add Indexes */
CREATE INDEX "domain_assessment_scores_asmt_id_dk_id_cnf_lvl_id_Idx" ON assessments.assmt_domain_assessment_scores (asmt_id, dk_id, cnf_lvl_id, das_deleted_at);

CREATE INDEX "domain_assessment_scores_das_status_Idx" ON assessments.assmt_domain_assessment_scores (das_status, das_deleted_at);


/******************** Add Table: assessments.assmt_domain_knowledge ************************/

/* Build Table Structure */
CREATE TABLE assessments.assmt_domain_knowledge
(
	dk_id VARCHAR(26) NOT NULL,
	tech_item_id VARCHAR(26) NOT NULL,
	dk_domain VARCHAR(500) NOT NULL,
	dk_weight NUMERIC(3, 2) NULL,
	dk_topic VARCHAR(1024) NOT NULL,
	dk_status BOOL DEFAULT true NOT NULL,
	dk_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	dk_updated_at TIMESTAMP NULL,
	dk_deleted_at TIMESTAMP NULL
);

/* Add Primary Key */
ALTER TABLE assessments.assmt_domain_knowledge ADD CONSTRAINT pkassmt_domain_knowledge
	PRIMARY KEY (dk_id);

/* Add Comments */
COMMENT ON COLUMN assessments.assmt_domain_knowledge.dk_id IS 'Identificador del dominio de conocimiento';

COMMENT ON COLUMN assessments.assmt_domain_knowledge.tech_item_id IS 'Identificador de la tecnología';

COMMENT ON COLUMN assessments.assmt_domain_knowledge.dk_domain IS 'Nombre descriptivo del dominio de conocimiento. Ejemplo: Programación Reactiva, Programación Asíncrona, entre otros';

COMMENT ON COLUMN assessments.assmt_domain_knowledge.dk_weight IS 'Peso (importancia) del dominio del conocimiento ; puede ir de 0.00 a 1.00';

COMMENT ON COLUMN assessments.assmt_domain_knowledge.dk_topic IS 'Comentario para guiar al experto en lo que evaluará';

COMMENT ON COLUMN assessments.assmt_domain_knowledge.dk_status IS 'Estado del registro. True activo, False inactivo';

COMMENT ON COLUMN assessments.assmt_domain_knowledge.dk_created_at IS 'Fecha y hora de creación del registro';

COMMENT ON COLUMN assessments.assmt_domain_knowledge.dk_updated_at IS 'Fecha y hora de última actualización del registro';

COMMENT ON COLUMN assessments.assmt_domain_knowledge.dk_deleted_at IS 'Fecha y hora de borrado del registro';

COMMENT ON TABLE assessments.assmt_domain_knowledge IS 'Dominios de conocimiento por cada tecnología';

/* Add Indexes */
CREATE INDEX "domain knowledge_dk_status_Idx" ON assessments.assmt_domain_knowledge (dk_status, dk_deleted_at);

CREATE INDEX "domain knowledge_tech_item_id_Idx" ON assessments.assmt_domain_knowledge (tech_item_id, dk_deleted_at);


/******************** Add Table: assessments.assmt_domain_knowledge_levels ************************/

/* Build Table Structure */
CREATE TABLE assessments.assmt_domain_knowledge_levels
(
	dk_lvl_id VARCHAR(26) NOT NULL,
	dk_id VARCHAR(26) NOT NULL,
	cnf_lvl_id VARCHAR(26) NOT NULL,
	level_id VARCHAR(26) NOT NULL,
	dk_lvl_status BOOL DEFAULT true NOT NULL,
	dk_lvl_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	dk_lvl_updated_at TIMESTAMP NULL,
	dk_lvl_deleted_at TIMESTAMP NULL
);

/* Add Primary Key */
ALTER TABLE assessments.assmt_domain_knowledge_levels ADD CONSTRAINT pkassmt_domain_knowledge_levels
	PRIMARY KEY (dk_lvl_id);

/* Add Comments */
COMMENT ON COLUMN assessments.assmt_domain_knowledge_levels.dk_lvl_id IS 'Identificador del dominio de conocimiento pero con una configuración de nivel';

COMMENT ON COLUMN assessments.assmt_domain_knowledge_levels.dk_id IS 'Identificador del dominio de conocimiento';

COMMENT ON COLUMN assessments.assmt_domain_knowledge_levels.cnf_lvl_id IS 'Identificador de la configuración usada con referencia a los niveles usado en el sistema';

COMMENT ON COLUMN assessments.assmt_domain_knowledge_levels.level_id IS 'Identificador del nivel a usar en el sistema. Ejemplo: Junior, Middle o Senior';

COMMENT ON COLUMN assessments.assmt_domain_knowledge_levels.dk_lvl_status IS 'Estado del registro. True activo, False inactivo';

COMMENT ON COLUMN assessments.assmt_domain_knowledge_levels.dk_lvl_created_at IS 'Fecha y hora de creación del registro';

COMMENT ON COLUMN assessments.assmt_domain_knowledge_levels.dk_lvl_updated_at IS 'Fecha y hora de última actualización del registro';

COMMENT ON COLUMN assessments.assmt_domain_knowledge_levels.dk_lvl_deleted_at IS 'Fecha y hora de borrado del registro';

COMMENT ON TABLE assessments.assmt_domain_knowledge_levels IS 'Esta tabla representa la relación condicional entre los elementos de conocimiento del dominio (`domain_knowledge`), los niveles de configuración (`configuration_levels`) y los niveles generales (`levels`). Su objetivo es garantizar que, cuando un elemento de conocimiento esté asociado a una configuración específica, también esté vinculado a un nivel determinado. Esta tabla intermedia asegura la consistencia de los datos al establecer una dependencia explícita entre configuraciones y niveles dentro del contexto del conocimiento de un dominio';

/* Add Indexes */
CREATE UNIQUE INDEX "domain_knowledge_levels_dk_id_cnf_lvl_id_level_id_Idx" ON assessments.assmt_domain_knowledge_levels (dk_id, cnf_lvl_id, level_id) WHERE dk_lvl_deleted_at IS NULL;

CREATE INDEX "domain_knowledge_levels_dk_lvl_status_Idx" ON assessments.assmt_domain_knowledge_levels (dk_lvl_status, dk_lvl_deleted_at);


/******************** Add Table: assessments.assmt_domain_questions_answers ************************/

/* Build Table Structure */
CREATE TABLE assessments.assmt_domain_questions_answers
(
	dqa_id VARCHAR(26) NOT NULL,
	dk_id VARCHAR(26) NOT NULL,
	dk_lvl_id VARCHAR(26) NOT NULL,
	dqa_question VARCHAR(500) NOT NULL,
	dqa_answer VARCHAR(8192) NOT NULL,
	dqa_status BOOL DEFAULT true NOT NULL,
	dqa_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	dqa_updated_at TIMESTAMP NULL,
	dqa_deleted_at TIMESTAMP NULL
);

/* Add Primary Key */
ALTER TABLE assessments.assmt_domain_questions_answers ADD CONSTRAINT pkassmt_domain_questions_answers
	PRIMARY KEY (dqa_id);

/* Add Comments */
COMMENT ON COLUMN assessments.assmt_domain_questions_answers.dqa_id IS 'Identificador de la pregunta del dominio de conocimiento';

COMMENT ON COLUMN assessments.assmt_domain_questions_answers.dk_id IS 'Identificador del dominio de conocimiento';

COMMENT ON COLUMN assessments.assmt_domain_questions_answers.dk_lvl_id IS 'Identificador del dominio de conocimiento pero con una configuración de nivel';

COMMENT ON COLUMN assessments.assmt_domain_questions_answers.dqa_question IS 'Pregunta a realizar bajo un dominio de conocimiento en una tecnología';

COMMENT ON COLUMN assessments.assmt_domain_questions_answers.dqa_answer IS 'Posible respuesta a recibir bajo un dominio de conocimiento en una tecnología';

COMMENT ON COLUMN assessments.assmt_domain_questions_answers.dqa_status IS 'Estado del registro. True activo, False inactivo';

COMMENT ON COLUMN assessments.assmt_domain_questions_answers.dqa_created_at IS 'Fecha y hora de creación del registro';

COMMENT ON COLUMN assessments.assmt_domain_questions_answers.dqa_updated_at IS 'Fecha y hora de última actualización del registro';

COMMENT ON COLUMN assessments.assmt_domain_questions_answers.dqa_deleted_at IS 'Fecha y hora de borrado del registro';

COMMENT ON TABLE assessments.assmt_domain_questions_answers IS 'Preguntas y respuestas para guiar al experto en su evaluación';

/* Add Indexes */
CREATE INDEX "domain_questions_answers_dk_id_Idx" ON assessments.assmt_domain_questions_answers (dk_id, dqa_deleted_at);

CREATE INDEX "domain_questions_answers_dk_lvl_id_Idx" ON assessments.assmt_domain_questions_answers (dk_lvl_id, dqa_deleted_at);

CREATE INDEX "dqa_dqa_status_Idx" ON assessments.assmt_domain_questions_answers (dqa_status, dqa_deleted_at);


/******************** Add Table: assessments.assmt_levels ************************/

/* Build Table Structure */
CREATE TABLE assessments.assmt_levels
(
	level_id VARCHAR(26) NOT NULL,
	level_name VARCHAR(30) NOT NULL,
	level_status BOOL DEFAULT true NOT NULL,
	level_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	level_updated_at TIMESTAMP NULL,
	level_deleted_at TIMESTAMP NULL
);

/* Add Primary Key */
ALTER TABLE assessments.assmt_levels ADD CONSTRAINT pkassmt_levels
	PRIMARY KEY (level_id);

/* Add Comments */
COMMENT ON COLUMN assessments.assmt_levels.level_id IS 'Identificador del nivel a usar en el sistema. Ejemplo: Junior, Middle o Senior';

COMMENT ON COLUMN assessments.assmt_levels.level_name IS 'Nombre del nivel a usar. Ejemplo: Junior, Middle, Senior';

COMMENT ON COLUMN assessments.assmt_levels.level_status IS 'Estado del registro. True activo, False inactivo';

COMMENT ON COLUMN assessments.assmt_levels.level_created_at IS 'Fecha y hora de creación del registro';

COMMENT ON COLUMN assessments.assmt_levels.level_updated_at IS 'Fecha y hora de última actualización del registro';

COMMENT ON COLUMN assessments.assmt_levels.level_deleted_at IS 'Fecha y hora de borrado del registro';

COMMENT ON TABLE assessments.assmt_levels IS 'Niveles a usar en el sistema. Ejemplo: Junior, Middle y Senior';

/* Add Indexes */
CREATE UNIQUE INDEX "levels_level_name_at_Idx" ON assessments.assmt_levels (level_name) WHERE level_deleted_at IS NULL;

CREATE INDEX "levels_level_status_Idx" ON assessments.assmt_levels (level_status, level_deleted_at);


/******************** Add Table: assessments.assmt_rating_scale ************************/

/* Build Table Structure */
CREATE TABLE assessments.assmt_rating_scale
(
	rc_id VARCHAR(26) NOT NULL,
	cnf_lvl_id VARCHAR(26) NOT NULL,
	rc_name VARCHAR(80) NOT NULL,
	rc_description VARCHAR(500) NOT NULL,
	rc_value NUMERIC(3, 2) NOT NULL,
	rc_position INTEGER NOT NULL,
	rc_status BOOL DEFAULT true NOT NULL,
	rc_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	rc_updated_at TIMESTAMP NULL,
	rc_deleted_at TIMESTAMP NULL
);

/* Add Primary Key */
ALTER TABLE assessments.assmt_rating_scale ADD CONSTRAINT pkassmt_rating_scale
	PRIMARY KEY (rc_id);

/* Add Comments */
COMMENT ON COLUMN assessments.assmt_rating_scale.rc_id IS 'Identificador de la escala a usar en un nivel';

COMMENT ON COLUMN assessments.assmt_rating_scale.cnf_lvl_id IS 'Identificador de la configuración usada con referencia a los niveles usado en el sistema';

COMMENT ON COLUMN assessments.assmt_rating_scale.rc_name IS 'Nombre de la escala a usar. Ejemplo: No conoce, Conoce, Comprende, Practica, Domina, Experto';

COMMENT ON COLUMN assessments.assmt_rating_scale.rc_description IS 'Descripción de la escala';

COMMENT ON COLUMN assessments.assmt_rating_scale.rc_value IS 'Valor de la escala 0.00, 1, 2, 3, 4 o 5.00 ; Se puede usar máximo 2 decimales';

COMMENT ON COLUMN assessments.assmt_rating_scale.rc_position IS 'Posición de la escala. Ejemplo: 1, 2, 3, 4, 5';

COMMENT ON COLUMN assessments.assmt_rating_scale.rc_status IS 'Estado del registro. True activo, False inactivo';

COMMENT ON COLUMN assessments.assmt_rating_scale.rc_created_at IS 'Fecha y hora de creación del registro';

COMMENT ON COLUMN assessments.assmt_rating_scale.rc_updated_at IS 'Fecha y hora de última actualización del registro';

COMMENT ON COLUMN assessments.assmt_rating_scale.rc_deleted_at IS 'Fecha y hora de borrado del registro';

COMMENT ON TABLE assessments.assmt_rating_scale IS 'Escala de calificación en una configuración del sistema';

/* Add Indexes */
CREATE INDEX "rating_scale_cnf_lvl_id_Idx" ON assessments.assmt_rating_scale (cnf_lvl_id, rc_deleted_at);

CREATE UNIQUE INDEX "rating_scale_cnf_lvl_id_rc_name_Idx" ON assessments.assmt_rating_scale (cnf_lvl_id, rc_name) WHERE rc_deleted_at IS NULL;

CREATE INDEX "rc_rc_status_Idx" ON assessments.assmt_rating_scale (rc_status, rc_deleted_at);


/******************** Add Table: human_resources.hr_professionals ************************/

/* Build Table Structure */
CREATE TABLE human_resources.hr_professionals
(
	pro_id VARCHAR(26) NOT NULL,
	pro_document_type VARCHAR(2) NOT NULL,
	pro_document VARCHAR(20) NOT NULL,
	pro_full_name VARCHAR(500) NOT NULL,
	pro_email VARCHAR(500) NOT NULL,
	pro_photo VARCHAR(1024) NULL,
	pro_status BOOL DEFAULT true NOT NULL,
	pro_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	pro_updated_at TIMESTAMP NULL,
	pro_deleted_at TIMESTAMP NULL
);

/* Add Primary Key */
ALTER TABLE human_resources.hr_professionals ADD CONSTRAINT pkhr_professionals
	PRIMARY KEY (pro_id);

/* Add Comments */
COMMENT ON COLUMN human_resources.hr_professionals.pro_id IS 'Identificador del profesional en el sistema';

COMMENT ON COLUMN human_resources.hr_professionals.pro_document_type IS 'CC = Cédula de Ciudadanía ; CE = Cédula de Extranjería';

COMMENT ON COLUMN human_resources.hr_professionals.pro_document IS 'Número de documento';

COMMENT ON COLUMN human_resources.hr_professionals.pro_full_name IS 'Nombre completo del profesional';

COMMENT ON COLUMN human_resources.hr_professionals.pro_email IS 'Correo corporativo del profesional';

COMMENT ON COLUMN human_resources.hr_professionals.pro_photo IS 'Foto del profesional';

COMMENT ON COLUMN human_resources.hr_professionals.pro_status IS 'Estado del registro. True activo, False inactivo';

COMMENT ON COLUMN human_resources.hr_professionals.pro_created_at IS 'Fecha y hora de creación del registro';

COMMENT ON COLUMN human_resources.hr_professionals.pro_updated_at IS 'Fecha y hora de última actualización del registro';

COMMENT ON COLUMN human_resources.hr_professionals.pro_deleted_at IS 'Fecha y hora de borrado del registro';

COMMENT ON TABLE human_resources.hr_professionals IS 'Datos de los profesionales de la empresa, es decir, programadores y demás';

/* Add Indexes */
CREATE UNIQUE INDEX "professionals_pro_document_type_pro_document_Idx" ON human_resources.hr_professionals (pro_document_type, pro_document) WHERE pro_deleted_at IS NULL;

CREATE UNIQUE INDEX "professionals_pro_email_Idx" ON human_resources.hr_professionals (pro_email) WHERE pro_deleted_at IS NULL;

CREATE INDEX "professionals_pro_full_name_Idx" ON human_resources.hr_professionals (pro_full_name, pro_deleted_at);

CREATE INDEX "professionals_pro_status_Idx" ON human_resources.hr_professionals (pro_status, pro_deleted_at);


/******************** Add Table: knowledge_gaps.kg_knowledge_gap_notes ************************/

/* Build Table Structure */
CREATE TABLE knowledge_gaps.kg_knowledge_gap_notes
(
	kgn_id VARCHAR(26) NOT NULL,
	user_id VARCHAR(26) NOT NULL,
	kg_id VARCHAR(26) NOT NULL,
	kgn_observation VARCHAR(8192) NOT NULL,
	kgn_status BOOL DEFAULT true NOT NULL,
	kgn_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	kgn_updated_at TIMESTAMP NULL,
	kgn_deleted_at TIMESTAMP NULL
);

/* Add Primary Key */
ALTER TABLE knowledge_gaps.kg_knowledge_gap_notes ADD CONSTRAINT pkkg_knowledge_gap_notes
	PRIMARY KEY (kgn_id);

/* Add Comments */
COMMENT ON COLUMN knowledge_gaps.kg_knowledge_gap_notes.kgn_id IS 'Identificador del la observación sobre el seguimiento a la brecha de conocimiento detectada';

COMMENT ON COLUMN knowledge_gaps.kg_knowledge_gap_notes.user_id IS 'Identificador del usuario en el sistema que realizó el seguimiento';

COMMENT ON COLUMN knowledge_gaps.kg_knowledge_gap_notes.kg_id IS 'Identificador de la brecha de conocimiento detectada';

COMMENT ON COLUMN knowledge_gaps.kg_knowledge_gap_notes.kgn_observation IS 'Observaciones de seguimiento en la brecha de conocimiento detectada';

COMMENT ON COLUMN knowledge_gaps.kg_knowledge_gap_notes.kgn_status IS 'Estado del registro. True activo, False inactivo';

COMMENT ON COLUMN knowledge_gaps.kg_knowledge_gap_notes.kgn_created_at IS 'Fecha y hora de creación del registro';

COMMENT ON COLUMN knowledge_gaps.kg_knowledge_gap_notes.kgn_updated_at IS 'Fecha y hora de última actualización del registro';

COMMENT ON COLUMN knowledge_gaps.kg_knowledge_gap_notes.kgn_deleted_at IS 'Fecha y hora de borrado del registro';

COMMENT ON TABLE knowledge_gaps.kg_knowledge_gap_notes IS 'Notas sobre una brecha de conocimiento detectada en un assessment';

/* Add Indexes */
CREATE INDEX "knowledge_gap_notes_kgn_status_Idx" ON knowledge_gaps.kg_knowledge_gap_notes (kgn_status, kgn_deleted_at);

CREATE INDEX "knowledge_gap_notes_user_id_kg_id_Idx" ON knowledge_gaps.kg_knowledge_gap_notes (user_id, kg_id, kgn_deleted_at);


/******************** Add Table: knowledge_gaps.kg_knowledge_gaps ************************/

/* Build Table Structure */
CREATE TABLE knowledge_gaps.kg_knowledge_gaps
(
	kg_id VARCHAR(26) NOT NULL,
	asmt_id VARCHAR(26) NOT NULL,
	dk_id VARCHAR(26) NOT NULL,
	kg_status BOOL DEFAULT true NOT NULL,
	kg_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	kg_updated_at TIMESTAMP NULL,
	kg_deleted_at TIMESTAMP NULL
);

/* Add Primary Key */
ALTER TABLE knowledge_gaps.kg_knowledge_gaps ADD CONSTRAINT pkkg_knowledge_gaps
	PRIMARY KEY (kg_id);

/* Add Comments */
COMMENT ON COLUMN knowledge_gaps.kg_knowledge_gaps.kg_id IS 'Identificador de la brecha de conocimiento detectada';

COMMENT ON COLUMN knowledge_gaps.kg_knowledge_gaps.asmt_id IS 'Identificador del assessment';

COMMENT ON COLUMN knowledge_gaps.kg_knowledge_gaps.dk_id IS 'Identificador del dominio de conocimiento';

COMMENT ON COLUMN knowledge_gaps.kg_knowledge_gaps.kg_status IS 'Estado del registro. True activo, False inactivo';

COMMENT ON COLUMN knowledge_gaps.kg_knowledge_gaps.kg_created_at IS 'Fecha y hora de creación del registro';

COMMENT ON COLUMN knowledge_gaps.kg_knowledge_gaps.kg_updated_at IS 'Fecha y hora de última actualización del registro';

COMMENT ON COLUMN knowledge_gaps.kg_knowledge_gaps.kg_deleted_at IS 'Fecha y hora de borrado del registro';

COMMENT ON TABLE knowledge_gaps.kg_knowledge_gaps IS 'Brechas de conocimiento detectadas en un assessment';

/* Add Indexes */
CREATE UNIQUE INDEX "knowledge_gaps_asmt_id_dk_id_Idx" ON knowledge_gaps.kg_knowledge_gaps (asmt_id, dk_id) WHERE kg_deleted_at IS NULL;

CREATE INDEX "knowledge_gaps_kg_status_Idx" ON knowledge_gaps.kg_knowledge_gaps (kg_status, kg_deleted_at);


/******************** Add Table: projects_management.pm_customers ************************/

/* Build Table Structure */
CREATE TABLE projects_management.pm_customers
(
	cus_id VARCHAR(26) NOT NULL,
	cus_name VARCHAR(500) NOT NULL,
	cus_status BOOL DEFAULT true NOT NULL,
	cus_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	cus_updated_at TIMESTAMP NULL,
	cus_deleted_at TIMESTAMP NULL
);

/* Add Primary Key */
ALTER TABLE projects_management.pm_customers ADD CONSTRAINT pkpm_customers
	PRIMARY KEY (cus_id);

/* Add Comments */
COMMENT ON COLUMN projects_management.pm_customers.cus_id IS 'Identificador del cliente';

COMMENT ON COLUMN projects_management.pm_customers.cus_name IS 'Nombre del cliente';

COMMENT ON COLUMN projects_management.pm_customers.cus_status IS 'Estado del registro. True activo, False inactivo';

COMMENT ON COLUMN projects_management.pm_customers.cus_created_at IS 'Fecha y hora de creación del registro';

COMMENT ON COLUMN projects_management.pm_customers.cus_updated_at IS 'Fecha y hora de última actualización del registro';

COMMENT ON COLUMN projects_management.pm_customers.cus_deleted_at IS 'Fecha y hora de borrado del registro';

COMMENT ON TABLE projects_management.pm_customers IS 'Clientes de la empresa';

/* Add Indexes */
CREATE UNIQUE INDEX "customers_cus_name_Idx" ON projects_management.pm_customers (cus_name) WHERE cus_deleted_at IS NULL;

CREATE INDEX "customers_customer_status_Idx" ON projects_management.pm_customers (cus_status, cus_deleted_at);


/******************** Add Table: projects_management.pm_projects ************************/

/* Build Table Structure */
CREATE TABLE projects_management.pm_projects
(
	project_id VARCHAR(26) NOT NULL,
	customer_id VARCHAR(26) NOT NULL,
	project_name VARCHAR(500) NOT NULL,
	project_status BOOL DEFAULT true NOT NULL,
	project_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	project_updated_at TIMESTAMP NULL,
	project_deleted_at TIMESTAMP NULL
);

/* Add Primary Key */
ALTER TABLE projects_management.pm_projects ADD CONSTRAINT pkpm_projects
	PRIMARY KEY (project_id);

/* Add Comments */
COMMENT ON COLUMN projects_management.pm_projects.project_id IS 'Identificador del proyecto de un cliente';

COMMENT ON COLUMN projects_management.pm_projects.customer_id IS 'Identificador del cliente';

COMMENT ON COLUMN projects_management.pm_projects.project_name IS 'Nombre del proyecto de un cliente';

COMMENT ON COLUMN projects_management.pm_projects.project_status IS 'Estado del registro. True activo, False inactivo';

COMMENT ON COLUMN projects_management.pm_projects.project_created_at IS 'Fecha y hora de creación del registro';

COMMENT ON COLUMN projects_management.pm_projects.project_updated_at IS 'Fecha y hora de última actualización del registro';

COMMENT ON COLUMN projects_management.pm_projects.project_deleted_at IS 'Fecha y hora de borrado del registro';

COMMENT ON TABLE projects_management.pm_projects IS 'Proyectos de un cliente';

/* Add Indexes */
CREATE INDEX "projects_customers_id_Idx" ON projects_management.pm_projects (customer_id);

CREATE UNIQUE INDEX "projects_project_name_customer_id_Idx" ON projects_management.pm_projects (project_name, customer_id) WHERE project_deleted_at IS NULL;

CREATE INDEX "projects_project_status_Idx" ON projects_management.pm_projects (project_status, project_deleted_at);


/******************** Add Table: projects_management.pm_role_per_professional ************************/

/* Build Table Structure */
CREATE TABLE projects_management.pm_role_per_professional
(
	rpp_id VARCHAR(26) NOT NULL,
	professional_id VARCHAR(26) NOT NULL,
	role_id VARCHAR(26) NOT NULL,
	rpp_start_date TIMESTAMP NOT NULL,
	rpp_end_date TIMESTAMP NULL,
	rpp_status BOOL DEFAULT true NOT NULL,
	rpp_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	rpp_updated_at TIMESTAMP NULL,
	rpp_deleted_at TIMESTAMP NULL
);

/* Add Primary Key */
ALTER TABLE projects_management.pm_role_per_professional ADD CONSTRAINT pkpm_role_per_professional
	PRIMARY KEY (rpp_id);

/* Add Comments */
COMMENT ON COLUMN projects_management.pm_role_per_professional.rpp_id IS 'Identificador del rol y el profesional en el sistema';

COMMENT ON COLUMN projects_management.pm_role_per_professional.professional_id IS 'Identificador del profesional en el sistema';

COMMENT ON COLUMN projects_management.pm_role_per_professional.role_id IS 'Identificador del rol en un proyecto de un cliente';

COMMENT ON COLUMN projects_management.pm_role_per_professional.rpp_start_date IS 'Fecha y hora en que el profesional entra a participar en un proyecto de un cliente con un rol específico';

COMMENT ON COLUMN projects_management.pm_role_per_professional.rpp_end_date IS 'Fecha y hora en que el profesional deja de participar en un proyecto de un cliente con un rol específico';

COMMENT ON COLUMN projects_management.pm_role_per_professional.rpp_status IS 'Estado del registro. True activo, False inactivo';

COMMENT ON COLUMN projects_management.pm_role_per_professional.rpp_created_at IS 'Fecha y hora de creación del registro';

COMMENT ON COLUMN projects_management.pm_role_per_professional.rpp_updated_at IS 'Fecha y hora de última actualización del registro';

COMMENT ON COLUMN projects_management.pm_role_per_professional.rpp_deleted_at IS 'Fecha y hora de borrado del registro';

COMMENT ON TABLE projects_management.pm_role_per_professional IS 'Roles de un profesional que pertenece a un proyecto en un cliente';

/* Add Indexes */
CREATE UNIQUE INDEX "role_per_professional_professional_id_role_id_Idx" ON projects_management.pm_role_per_professional (professional_id, role_id) WHERE rpp_deleted_at IS NULL;

CREATE INDEX "role_per_professional_rpp_status_Idx" ON projects_management.pm_role_per_professional (rpp_status, rpp_deleted_at);


/******************** Add Table: projects_management.pm_roles ************************/

/* Build Table Structure */
CREATE TABLE projects_management.pm_roles
(
	role_id VARCHAR(26) NOT NULL,
	roles_sub_role_id VARCHAR(26) NULL,
	role_name VARCHAR(500) NOT NULL,
	role_description VARCHAR(2048) NULL,
	role_status BOOL DEFAULT true NOT NULL,
	role_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	role_updated_at TIMESTAMP NULL,
	role_deleted_at TIMESTAMP NULL
);

/* Add Primary Key */
ALTER TABLE projects_management.pm_roles ADD CONSTRAINT pkpm_roles
	PRIMARY KEY (role_id);

/* Add Comments */
COMMENT ON COLUMN projects_management.pm_roles.role_id IS 'Identificador del rol en un proyecto de un cliente';

COMMENT ON COLUMN projects_management.pm_roles.roles_sub_role_id IS 'sub-rol; esta opción se usa cuando se crea un rol que está compuesto por varios roles';

COMMENT ON COLUMN projects_management.pm_roles.role_name IS 'Nombre del rol en un proyecto de un cliente';

COMMENT ON COLUMN projects_management.pm_roles.role_description IS 'Descripción del rol en un proyecto de un cliente';

COMMENT ON COLUMN projects_management.pm_roles.role_status IS 'Estado del registro. True activo, False inactivo';

COMMENT ON COLUMN projects_management.pm_roles.role_created_at IS 'Fecha y hora de creación del registro';

COMMENT ON COLUMN projects_management.pm_roles.role_updated_at IS 'Fecha y hora de última actualización del registro';

COMMENT ON COLUMN projects_management.pm_roles.role_deleted_at IS 'Fecha y hora de borrado del registro';

COMMENT ON TABLE projects_management.pm_roles IS 'Roles en los proyectos de un cliente';

/* Add Indexes */
CREATE UNIQUE INDEX "roles_role_name_Idx" ON projects_management.pm_roles (role_name) WHERE role_deleted_at IS NULL;

CREATE INDEX "roles_role_status_Idx" ON projects_management.pm_roles (role_status, role_deleted_at);

CREATE INDEX "roles_roles_sub_role_id_Idx" ON projects_management.pm_roles (roles_sub_role_id, role_deleted_at);


/******************** Add Table: projects_management.pm_technology_per_role ************************/

/* Build Table Structure */
CREATE TABLE projects_management.pm_technology_per_role
(
	tpr_id VARCHAR(26) NOT NULL,
	ts_id VARCHAR(26) NOT NULL,
	role_id VARCHAR(26) NOT NULL,
	tpr_status BOOL DEFAULT true NOT NULL,
	tpr_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	tpr_updated_at TIMESTAMP NULL,
	tpr_deleted_at TIMESTAMP NULL
);

/* Add Primary Key */
ALTER TABLE projects_management.pm_technology_per_role ADD CONSTRAINT pkpm_technology_per_role
	PRIMARY KEY (tpr_id);

/* Add Comments */
COMMENT ON COLUMN projects_management.pm_technology_per_role.tpr_id IS 'Identificador de la tecnología por rol en un proyecto de un cliente';

COMMENT ON COLUMN projects_management.pm_technology_per_role.ts_id IS 'Identificador del stack tecnológico';

COMMENT ON COLUMN projects_management.pm_technology_per_role.role_id IS 'Identificador del rol en un proyecto de un cliente';

COMMENT ON COLUMN projects_management.pm_technology_per_role.tpr_status IS 'Estado del registro. True activo, False inactivo';

COMMENT ON COLUMN projects_management.pm_technology_per_role.tpr_created_at IS 'Fecha y hora de creación del registro';

COMMENT ON COLUMN projects_management.pm_technology_per_role.tpr_updated_at IS 'Fecha y hora de última actualización del registro';

COMMENT ON COLUMN projects_management.pm_technology_per_role.tpr_deleted_at IS 'Fecha y hora de borrado del registro';

COMMENT ON TABLE projects_management.pm_technology_per_role IS 'Tecnologías usadas por un rol en un proyecto';

/* Add Indexes */
CREATE INDEX "technology_per_role_tpr_status_Idx" ON projects_management.pm_technology_per_role (tpr_status, tpr_deleted_at);

CREATE UNIQUE INDEX "technology_per_role_ts_id_role_id_Idx" ON projects_management.pm_technology_per_role (ts_id, role_id) WHERE tpr_deleted_at IS NULL;


/******************** Add Table: projects_management.pm_technology_stack ************************/

/* Build Table Structure */
CREATE TABLE projects_management.pm_technology_stack
(
	ts_id VARCHAR(26) NOT NULL,
	tech_item_id VARCHAR(26) NOT NULL,
	project_id VARCHAR(26) NOT NULL,
	ts_weight NUMERIC(3, 2) NULL,
	ts_status BOOL DEFAULT true NOT NULL,
	ts_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	ts_updated_at TIMESTAMP NULL,
	ts_deleted_at TIMESTAMP NULL
);

/* Add Primary Key */
ALTER TABLE projects_management.pm_technology_stack ADD CONSTRAINT pkpm_technology_stack
	PRIMARY KEY (ts_id);

/* Add Comments */
COMMENT ON COLUMN projects_management.pm_technology_stack.ts_id IS 'Identificador del stack tecnológico';

COMMENT ON COLUMN projects_management.pm_technology_stack.tech_item_id IS 'Identificador de la tecnología';

COMMENT ON COLUMN projects_management.pm_technology_stack.project_id IS 'Identificador del proyecto de un cliente';

COMMENT ON COLUMN projects_management.pm_technology_stack.ts_weight IS 'Peso (importancia) de la tecnología ; puede ir de 0.00 a 1.00';

COMMENT ON COLUMN projects_management.pm_technology_stack.ts_status IS 'Estado del registro. True activo, False inactivo';

COMMENT ON COLUMN projects_management.pm_technology_stack.ts_created_at IS 'Fecha y hora de creación del registro';

COMMENT ON COLUMN projects_management.pm_technology_stack.ts_updated_at IS 'Fecha y hora de última actualización del registro';

COMMENT ON COLUMN projects_management.pm_technology_stack.ts_deleted_at IS 'Fecha y hora de borrado del registro';

COMMENT ON TABLE projects_management.pm_technology_stack IS 'Stack tecnológico de un proyecto en un cliente';

/* Add Indexes */
CREATE UNIQUE INDEX "technology_stack_tech_item_id_project_id_Idx" ON projects_management.pm_technology_stack (tech_item_id, project_id) WHERE ts_deleted_at IS NULL;

CREATE INDEX "technology_stack_ts_status_Idx" ON projects_management.pm_technology_stack (ts_status, ts_deleted_at);


/******************** Add Table: security.sec_roles ************************/

/* Build Table Structure */
CREATE TABLE security.sec_roles
(
	role_id VARCHAR(26) NOT NULL,
	role_name VARCHAR(50) NOT NULL,
	role_description VARCHAR(1024) NOT NULL,
	role_status BOOL DEFAULT true NOT NULL,
	role_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	role_updated_at TIMESTAMP NULL,
	role_deleted_at TIMESTAMP NULL
);

/* Add Primary Key */
ALTER TABLE security.sec_roles ADD CONSTRAINT pksec_roles
	PRIMARY KEY (role_id);

/* Add Comments */
COMMENT ON COLUMN security.sec_roles.role_id IS 'Identificador del rol';

COMMENT ON COLUMN security.sec_roles.role_name IS 'Nombre del rol';

COMMENT ON COLUMN security.sec_roles.role_description IS 'Descripción del rol';

COMMENT ON COLUMN security.sec_roles.role_status IS 'Estado del registro. True activo, False inactivo';

COMMENT ON COLUMN security.sec_roles.role_created_at IS 'Fecha y hora de creación del registro';

COMMENT ON COLUMN security.sec_roles.role_updated_at IS 'Fecha y hora de última actualización del registro';

COMMENT ON COLUMN security.sec_roles.role_deleted_at IS 'Fecha y hora de borrado del registro';

COMMENT ON TABLE security.sec_roles IS 'Roles del sistema ANTARES';

/* Add Indexes */
CREATE UNIQUE INDEX "roles_role_name_Idx" ON security.sec_roles (role_name) WHERE role_deleted_at IS NULL;

CREATE INDEX "roles_role_status_Idx" ON security.sec_roles (role_status, role_deleted_at);


/******************** Add Table: security.sec_user_per_role ************************/

/* Build Table Structure */
CREATE TABLE security.sec_user_per_role
(
	upr_id VARCHAR(26) NOT NULL,
	user_id VARCHAR(26) NOT NULL,
	role_id VARCHAR(26) NOT NULL,
	upr_status BOOL DEFAULT true NOT NULL,
	upr_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	upr_updated_at TIMESTAMP NULL,
	upr_deleted_at TIMESTAMP NULL
);

/* Add Primary Key */
ALTER TABLE security.sec_user_per_role ADD CONSTRAINT pksec_user_per_role
	PRIMARY KEY (upr_id);

/* Add Comments */
COMMENT ON COLUMN security.sec_user_per_role.upr_id IS 'Identificador del rol y el usuario en el sistema';

COMMENT ON COLUMN security.sec_user_per_role.user_id IS 'Identificador del usuario en el sistema';

COMMENT ON COLUMN security.sec_user_per_role.role_id IS 'Identificador del rol';

COMMENT ON COLUMN security.sec_user_per_role.upr_status IS 'Estado del registro. True activo, False inactivo';

COMMENT ON COLUMN security.sec_user_per_role.upr_created_at IS 'Fecha y hora de creación del registro';

COMMENT ON COLUMN security.sec_user_per_role.upr_updated_at IS 'Fecha y hora de última actualización del registro';

COMMENT ON COLUMN security.sec_user_per_role.upr_deleted_at IS 'Fecha y hora de borrado del registro';

COMMENT ON TABLE security.sec_user_per_role IS 'Los roles de un usuario en ANTARES';

/* Add Indexes */
CREATE INDEX "user_per_role_upr_status_Idx" ON security.sec_user_per_role (upr_status, upr_deleted_at);

CREATE UNIQUE INDEX "user_per_role_user_id_role_id_Idx" ON security.sec_user_per_role (user_id, role_id) WHERE upr_deleted_at IS NULL;


/******************** Add Table: security.sec_users ************************/

/* Build Table Structure */
CREATE TABLE security.sec_users
(
	user_id VARCHAR(26) NOT NULL,
	user_full_name VARCHAR(500) NOT NULL,
	user_email VARCHAR(500) NOT NULL,
	user_status BOOL DEFAULT true NOT NULL,
	user_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	user_updated_at TIMESTAMP NULL,
	user_deleted_at TIMESTAMP NULL
);

/* Add Primary Key */
ALTER TABLE security.sec_users ADD CONSTRAINT pksec_users
	PRIMARY KEY (user_id);

/* Add Comments */
COMMENT ON COLUMN security.sec_users.user_id IS 'Identificador del usuario en el sistema';

COMMENT ON COLUMN security.sec_users.user_full_name IS 'Nombre completo del usuario';

COMMENT ON COLUMN security.sec_users.user_email IS 'Correo corporativo del usuario';

COMMENT ON COLUMN security.sec_users.user_status IS 'Estado del registro. True activo, False inactivo';

COMMENT ON COLUMN security.sec_users.user_created_at IS 'Fecha y hora de creación del registro';

COMMENT ON COLUMN security.sec_users.user_updated_at IS 'Fecha y hora de última actualización del registro';

COMMENT ON COLUMN security.sec_users.user_deleted_at IS 'Fecha y hora de borrado del registro';

COMMENT ON TABLE security.sec_users IS 'Usuarios del sistema ANTARES';

/* Add Indexes */
CREATE UNIQUE INDEX "users_user_email_Idx" ON security.sec_users (user_email) WHERE user_deleted_at IS NULL;

CREATE INDEX "users_user_status_Idx" ON security.sec_users (user_status, user_deleted_at);


/******************** Add Table: technologies.tech_technology_items ************************/

/* Build Table Structure */
CREATE TABLE technologies.tech_technology_items
(
	tech_item_id VARCHAR(26) NOT NULL,
	tech_type_id VARCHAR(26) NOT NULL,
	tech_item_name VARCHAR(500) NOT NULL,
	tech_item_description VARCHAR(2048) NULL,
	tech_item_icon VARCHAR(500) NULL,
	tech_item_status BOOL DEFAULT true NOT NULL,
	tech_item_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	tech_item_updated_at TIMESTAMP NULL,
	tech_item_deleted_at TIMESTAMP NULL
);

/* Add Primary Key */
ALTER TABLE technologies.tech_technology_items ADD CONSTRAINT pktech_technology_items
	PRIMARY KEY (tech_item_id);

/* Add Comments */
COMMENT ON COLUMN technologies.tech_technology_items.tech_item_id IS 'Identificador de la tecnología';

COMMENT ON COLUMN technologies.tech_technology_items.tech_type_id IS 'Identificador del tipo de tecnología';

COMMENT ON COLUMN technologies.tech_technology_items.tech_item_name IS 'Nombre de la tecnología';

COMMENT ON COLUMN technologies.tech_technology_items.tech_item_description IS 'Descripción de la tecnología';

COMMENT ON COLUMN technologies.tech_technology_items.tech_item_icon IS 'Ícono de la tecnología';

COMMENT ON COLUMN technologies.tech_technology_items.tech_item_status IS 'Estado del registro. True activo, False inactivo';

COMMENT ON COLUMN technologies.tech_technology_items.tech_item_created_at IS 'Fecha y hora de creación del registro';

COMMENT ON COLUMN technologies.tech_technology_items.tech_item_updated_at IS 'Fecha y hora de última actualización del registro';

COMMENT ON COLUMN technologies.tech_technology_items.tech_item_deleted_at IS 'Fecha y hora de borrado del registro';

COMMENT ON TABLE technologies.tech_technology_items IS 'Tecnologías usadas en los diferentes clientes de la empresa';

/* Add Indexes */
CREATE UNIQUE INDEX "technologies_tech_name_tech_deleted_at_Idx" ON technologies.tech_technology_items (tech_item_name) WHERE tech_item_deleted_at IS NULL;

CREATE INDEX "technology_items_tech_item_status_Idx" ON technologies.tech_technology_items (tech_item_status, tech_item_deleted_at);


/******************** Add Table: technologies.tech_technology_types ************************/

/* Build Table Structure */
CREATE TABLE technologies.tech_technology_types
(
	tech_type_id VARCHAR(26) NOT NULL,
	tech_type_name VARCHAR(500) NOT NULL,
	tech_type_description VARCHAR(2048) NULL,
	tech_type_status BOOL DEFAULT true NOT NULL,
	tech_type_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	tech_type_updated_at TIMESTAMP NULL,
	tech_type_deleted_at TIMESTAMP NULL
);

/* Add Primary Key */
ALTER TABLE technologies.tech_technology_types ADD CONSTRAINT pktech_technology_types
	PRIMARY KEY (tech_type_id);

/* Add Comments */
COMMENT ON COLUMN technologies.tech_technology_types.tech_type_id IS 'Identificador del tipo de tecnología';

COMMENT ON COLUMN technologies.tech_technology_types.tech_type_name IS 'Nombre del tipo de tecnología';

COMMENT ON COLUMN technologies.tech_technology_types.tech_type_description IS 'Descripción del tipo de tecnología';

COMMENT ON COLUMN technologies.tech_technology_types.tech_type_status IS 'Estado del registro. True activo, False inactivo';

COMMENT ON COLUMN technologies.tech_technology_types.tech_type_created_at IS 'Fecha y hora de creación del registro';

COMMENT ON COLUMN technologies.tech_technology_types.tech_type_updated_at IS 'Fecha y hora de última actualización del registro';

COMMENT ON COLUMN technologies.tech_technology_types.tech_type_deleted_at IS 'Fecha y hora de borrado del registro';

COMMENT ON TABLE technologies.tech_technology_types IS 'Tipos de tecnologías';

/* Add Indexes */
CREATE UNIQUE INDEX "technology_types_tech_type_name_Idx" ON technologies.tech_technology_types (tech_type_name) WHERE tech_type_deleted_at IS NULL;

CREATE INDEX "technology_types_tech_type_status_Idx" ON technologies.tech_technology_types (tech_type_status, tech_type_deleted_at);


/************ Add Foreign Keys ***************/

/* Add Foreign Key: fk_assessments_role_per_professional */
ALTER TABLE assessments.assmt_assessments ADD CONSTRAINT fk_assessments_role_per_professional
	FOREIGN KEY (rpp_id) REFERENCES projects_management.pm_role_per_professional (rpp_id)
	ON UPDATE RESTRICT ON DELETE RESTRICT;

/* Add Foreign Key: fk_assessments_users */
ALTER TABLE assessments.assmt_assessments ADD CONSTRAINT fk_assessments_users
	FOREIGN KEY (user_id) REFERENCES security.sec_users (user_id)
	ON UPDATE RESTRICT ON DELETE RESTRICT;

/* Add Foreign Key: fk_configuration_per_level_configuration_levels */
ALTER TABLE assessments.assmt_configuration_per_level ADD CONSTRAINT fk_configuration_per_level_configuration_levels
	FOREIGN KEY (cnf_lvl_id) REFERENCES assessments.assmt_configuration_levels (cnf_lvl_id)
	ON UPDATE RESTRICT ON DELETE RESTRICT;

/* Add Foreign Key: fk_configuration_per_level_levels */
ALTER TABLE assessments.assmt_configuration_per_level ADD CONSTRAINT fk_configuration_per_level_levels
	FOREIGN KEY (level_id) REFERENCES assessments.assmt_levels (level_id)
	ON UPDATE RESTRICT ON DELETE RESTRICT;

/* Add Foreign Key: fk_domain_assessment_scores_assessments */
ALTER TABLE assessments.assmt_domain_assessment_scores ADD CONSTRAINT fk_domain_assessment_scores_assessments
	FOREIGN KEY (asmt_id) REFERENCES assessments.assmt_assessments (asmt_id)
	ON UPDATE RESTRICT ON DELETE RESTRICT;

/* Add Foreign Key: fk_domain_assessment_scores_configuration_levels */
ALTER TABLE assessments.assmt_domain_assessment_scores ADD CONSTRAINT fk_domain_assessment_scores_configuration_levels
	FOREIGN KEY (cnf_lvl_id) REFERENCES assessments.assmt_configuration_levels (cnf_lvl_id)
	ON UPDATE RESTRICT ON DELETE RESTRICT;

/* Add Foreign Key: fk_domain_assessment_scores_domain_knowledge */
ALTER TABLE assessments.assmt_domain_assessment_scores ADD CONSTRAINT fk_domain_assessment_scores_domain_knowledge
	FOREIGN KEY (dk_id) REFERENCES assessments.assmt_domain_knowledge (dk_id)
	ON UPDATE RESTRICT ON DELETE RESTRICT;

/* Add Foreign Key: fk_domain_knowledge_technology_items */
ALTER TABLE assessments.assmt_domain_knowledge ADD CONSTRAINT fk_domain_knowledge_technology_items
	FOREIGN KEY (tech_item_id) REFERENCES technologies.tech_technology_items (tech_item_id)
	ON UPDATE RESTRICT ON DELETE RESTRICT;

/* Add Foreign Key: fk_domain_knowledge_levels_configuration_levels */
ALTER TABLE assessments.assmt_domain_knowledge_levels ADD CONSTRAINT fk_domain_knowledge_levels_configuration_levels
	FOREIGN KEY (cnf_lvl_id) REFERENCES assessments.assmt_configuration_levels (cnf_lvl_id)
	ON UPDATE RESTRICT ON DELETE RESTRICT;

/* Add Foreign Key: fk_domain_knowledge_levels_domain_knowledge */
ALTER TABLE assessments.assmt_domain_knowledge_levels ADD CONSTRAINT fk_domain_knowledge_levels_domain_knowledge
	FOREIGN KEY (dk_id) REFERENCES assessments.assmt_domain_knowledge (dk_id)
	ON UPDATE RESTRICT ON DELETE RESTRICT;

/* Add Foreign Key: fk_domain_knowledge_levels_levels */
ALTER TABLE assessments.assmt_domain_knowledge_levels ADD CONSTRAINT fk_domain_knowledge_levels_levels
	FOREIGN KEY (level_id) REFERENCES assessments.assmt_levels (level_id)
	ON UPDATE RESTRICT ON DELETE RESTRICT;

/* Add Foreign Key: fk_domain_questions_answers_domain_knowledge */
ALTER TABLE assessments.assmt_domain_questions_answers ADD CONSTRAINT fk_domain_questions_answers_domain_knowledge
	FOREIGN KEY (dk_id) REFERENCES assessments.assmt_domain_knowledge (dk_id)
	ON UPDATE RESTRICT ON DELETE RESTRICT;

/* Add Foreign Key: fk_domain_questions_answers_domain_knowledge_levels */
ALTER TABLE assessments.assmt_domain_questions_answers ADD CONSTRAINT fk_domain_questions_answers_domain_knowledge_levels
	FOREIGN KEY (dk_lvl_id) REFERENCES assessments.assmt_domain_knowledge_levels (dk_lvl_id)
	ON UPDATE RESTRICT ON DELETE RESTRICT;

/* Add Foreign Key: fk_rating_scale_configuration_levels */
ALTER TABLE assessments.assmt_rating_scale ADD CONSTRAINT fk_rating_scale_configuration_levels
	FOREIGN KEY (cnf_lvl_id) REFERENCES assessments.assmt_configuration_levels (cnf_lvl_id)
	ON UPDATE RESTRICT ON DELETE RESTRICT;

/* Add Foreign Key: fk_knowledge_gap_notes_knowledge_gaps */
ALTER TABLE knowledge_gaps.kg_knowledge_gap_notes ADD CONSTRAINT fk_knowledge_gap_notes_knowledge_gaps
	FOREIGN KEY (kg_id) REFERENCES knowledge_gaps.kg_knowledge_gaps (kg_id)
	ON UPDATE RESTRICT ON DELETE RESTRICT;

/* Add Foreign Key: fk_knowledge_gap_notes_users */
ALTER TABLE knowledge_gaps.kg_knowledge_gap_notes ADD CONSTRAINT fk_knowledge_gap_notes_users
	FOREIGN KEY (user_id) REFERENCES security.sec_users (user_id)
	ON UPDATE RESTRICT ON DELETE RESTRICT;

/* Add Foreign Key: fk_knowledge_gaps_assessments */
ALTER TABLE knowledge_gaps.kg_knowledge_gaps ADD CONSTRAINT fk_knowledge_gaps_assessments
	FOREIGN KEY (asmt_id) REFERENCES assessments.assmt_assessments (asmt_id)
	ON UPDATE RESTRICT ON DELETE RESTRICT;

/* Add Foreign Key: fk_knowledge_gaps_domain_knowledge */
ALTER TABLE knowledge_gaps.kg_knowledge_gaps ADD CONSTRAINT fk_knowledge_gaps_domain_knowledge
	FOREIGN KEY (dk_id) REFERENCES assessments.assmt_domain_knowledge (dk_id)
	ON UPDATE RESTRICT ON DELETE RESTRICT;

/* Add Foreign Key: fk_projects_customers */
ALTER TABLE projects_management.pm_projects ADD CONSTRAINT fk_projects_customers
	FOREIGN KEY (customer_id) REFERENCES projects_management.pm_customers (cus_id)
	ON UPDATE RESTRICT ON DELETE RESTRICT;

/* Add Foreign Key: fk_professional_per_project_professionals */
ALTER TABLE projects_management.pm_role_per_professional ADD CONSTRAINT fk_professional_per_project_professionals
	FOREIGN KEY (professional_id) REFERENCES human_resources.hr_professionals (pro_id)
	ON UPDATE RESTRICT ON DELETE RESTRICT;

/* Add Foreign Key: fk_role_per_professional_roles */
ALTER TABLE projects_management.pm_role_per_professional ADD CONSTRAINT fk_role_per_professional_roles
	FOREIGN KEY (role_id) REFERENCES projects_management.pm_roles (role_id)
	ON UPDATE RESTRICT ON DELETE RESTRICT;

/* Add Foreign Key: fk_roles_roles */
ALTER TABLE projects_management.pm_roles ADD CONSTRAINT fk_roles_roles
	FOREIGN KEY (roles_sub_role_id) REFERENCES projects_management.pm_roles (role_id)
	ON UPDATE RESTRICT ON DELETE RESTRICT;

/* Add Foreign Key: fk_technology_per_role_roles */
ALTER TABLE projects_management.pm_technology_per_role ADD CONSTRAINT fk_technology_per_role_roles
	FOREIGN KEY (role_id) REFERENCES projects_management.pm_roles (role_id)
	ON UPDATE RESTRICT ON DELETE RESTRICT;

/* Add Foreign Key: fk_technology_per_role_technology_stack */
ALTER TABLE projects_management.pm_technology_per_role ADD CONSTRAINT fk_technology_per_role_technology_stack
	FOREIGN KEY (ts_id) REFERENCES projects_management.pm_technology_stack (ts_id)
	ON UPDATE RESTRICT ON DELETE RESTRICT;

/* Add Foreign Key: fk_technology_stack_projects */
ALTER TABLE projects_management.pm_technology_stack ADD CONSTRAINT fk_technology_stack_projects
	FOREIGN KEY (project_id) REFERENCES projects_management.pm_projects (project_id)
	ON UPDATE RESTRICT ON DELETE RESTRICT;

/* Add Foreign Key: fk_technology_stack_technology_items */
ALTER TABLE projects_management.pm_technology_stack ADD CONSTRAINT fk_technology_stack_technology_items
	FOREIGN KEY (tech_item_id) REFERENCES technologies.tech_technology_items (tech_item_id)
	ON UPDATE RESTRICT ON DELETE RESTRICT;

/* Add Foreign Key: fk_user_per_role_roles */
ALTER TABLE security.sec_user_per_role ADD CONSTRAINT fk_user_per_role_roles
	FOREIGN KEY (role_id) REFERENCES security.sec_roles (role_id)
	ON UPDATE RESTRICT ON DELETE RESTRICT;

/* Add Foreign Key: fk_user_per_role_users */
ALTER TABLE security.sec_user_per_role ADD CONSTRAINT fk_user_per_role_users
	FOREIGN KEY (user_id) REFERENCES security.sec_users (user_id)
	ON UPDATE RESTRICT ON DELETE RESTRICT;

/* Add Foreign Key: fk_technology_items_technology_types */
ALTER TABLE technologies.tech_technology_items ADD CONSTRAINT fk_technology_items_technology_types
	FOREIGN KEY (tech_type_id) REFERENCES technologies.tech_technology_types (tech_type_id)
	ON UPDATE RESTRICT ON DELETE RESTRICT;