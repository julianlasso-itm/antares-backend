export interface AssessmentDataDto {
  assessmentId: string | null;
  configurationLevelId: string;
  domainKnowledges: DomainKnowledgeDataDto[];
  endDate: string | null;
  observations: string | null;
  rolePerProfessionalId: string;
  score: number;
  startDate: string;
  status: boolean;
  userId: string;
}

export interface DomainKnowledgeDataDto {
  domainAssessmentScoreId: string | null;
  domainKnowledgeId: string;
  observations: string;
  score: number;
  rating: number;
}
