export interface Doctor {
  id: string;
  name: string;
  name_initials: string;
  photo: string;
  doctor_introduction: string;
  specialities: Array<{ name: string }>;
  fees: string;
  experience: string;
  languages: string[];
  isVideoConsultAvailable: boolean;
  isClinicAvailable: boolean;
  consultMode: 'VIDEO_CONSULT' | 'IN_CLINIC' | 'BOTH';
  rating: number;
}

export type ConsultationType = 'VIDEO_CONSULT' | 'IN_CLINIC' | null;

export type SortOption = 'fees' | 'experience' | null;

export interface FilterState {
  search: string;
  consultationType: ConsultationType;
  specialties: string[];
  sortBy: SortOption;
}

export const ALL_SPECIALTIES = [
  "Dentist",
  "Cardiologist",
  "Dermatologist",
  "Neurologist",
  "Orthopedic",
  "Pediatrician",
  "Gynecologist",
  "Ophthalmologist",
  "ENT Specialist",
  "Psychiatrist",
  "Gastroenterologist",
  "Urologist",
  "Pulmonologist",
  "Endocrinologist",
  "Rheumatologist",
  "Oncologist",
  "Nephrologist",
  "Hematologist",
  "Nutritionist",
  "General Physician",
  "Physiotherapist",
  "Allergist",
  "Immunologist",
  "Anesthesiologist",
  "Radiologist"
];