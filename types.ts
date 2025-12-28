
export interface UserProfile {
  interests: string;
  skills: string;
  academicStrengths: string;
  careerGoals: string;
  preferredWorkEnvironment: 'remote' | 'office' | 'field' | 'flexible';
}

export interface CareerRecommendation {
  title: string;
  description: string;
  whyFits: string;
  requiredSkills: string[];
  learningPath: {
    stage: string;
    description: string;
  }[];
  salaryRange: string;
  jobOutlook: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface AssessmentState {
  step: number;
  loading: boolean;
  error: string | null;
  profile: UserProfile;
  results: CareerRecommendation[] | null;
}
