export type Language = 'bn' | 'en';

export enum PathType {
  ACADEMIC = 'ACADEMIC',
  JOB_PREP = 'JOB_PREP'
}

export enum SubPath {
  // Academic
  KINDERGARTEN = 'KINDERGARTEN',
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  SSC_HSC = 'SSC_HSC',
  ADMISSION = 'ADMISSION',
  MADRASA = 'MADRASA',
  
  // Job
  BCS_PUBLIC = 'BCS_PUBLIC',
  PRIVATE_JOB = 'PRIVATE_JOB',
  MILITARY = 'MILITARY',
  SKILL_ABROAD = 'SKILL_ABROAD'
}

export enum ThemeMode {
  FUN = 'FUN',           // Kindergarten
  LEARNING = 'LEARNING', // Primary
  STUDY = 'STUDY',       // Secondary
  EXAM = 'EXAM',         // SSC/HSC/Admission
  PROFESSIONAL = 'PROFESSIONAL', // Job
  MADRASA_THEME = 'MADRASA_THEME'
}

export interface UserProfile {
  name: string;
  language: Language;
  pathType: PathType | null;
  subPath: SubPath | null;
  details: {
    classLevel?: string; // e.g., Class 5, Class 9
    curriculum?: 'bangla' | 'english' | 'madrasa' | 'version';
    goal?: string; // e.g., "Pass math", "Get a bank job"
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface MarketplaceItem {
  id: string;
  title: string;
  type: 'book' | 'course' | 'mentor';
  price: string;
  image: string;
}
