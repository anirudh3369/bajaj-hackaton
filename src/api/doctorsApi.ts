import { Doctor } from '../types';

interface ApiDoctor {
  id: string;
  name: string;
  name_initials: string;
  photo: string;
  doctor_introduction: string;
  specialities: Array<{ name: string }>;
  fees: string;
  experience: string;
  languages: string[];
}

const validateDoctor = (doctor: ApiDoctor): Doctor => {
  // Extract years of experience from the experience string
  const experienceMatch = doctor.experience.match(/\d+/);
  const experienceYears = experienceMatch ? parseInt(experienceMatch[0], 10) : 0;

  // Extract fee amount from the fees string
  const feesMatch = doctor.fees.match(/\d+/);
  const feesAmount = feesMatch ? parseInt(feesMatch[0], 10) : 0;

  // Randomly assign consultation modes for demo purposes
  // In a real application, this would come from the API
  const isVideoConsultAvailable = Math.random() > 0.5;
  const isClinicAvailable = Math.random() > 0.5;
  let consultMode: 'VIDEO_CONSULT' | 'IN_CLINIC' | 'BOTH' = 'BOTH';
  
  if (isVideoConsultAvailable && !isClinicAvailable) {
    consultMode = 'VIDEO_CONSULT';
  } else if (!isVideoConsultAvailable && isClinicAvailable) {
    consultMode = 'IN_CLINIC';
  }

  return {
    id: doctor.id,
    name: doctor.name,
    name_initials: doctor.name_initials,
    photo: doctor.photo,
    doctor_introduction: doctor.doctor_introduction,
    specialities: doctor.specialities,
    fees: doctor.fees,
    experience: doctor.experience,
    languages: doctor.languages,
    isVideoConsultAvailable,
    isClinicAvailable,
    consultMode,
    rating: (Math.random() * 2 + 3).toFixed(1) as unknown as number // Random rating between 3.0 and 5.0
  };
};

export const fetchDoctors = async (): Promise<Doctor[]> => {
  try {
    const response = await fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');
    if (!response.ok) {
      throw new Error('Failed to fetch doctors');
    }
    const data: ApiDoctor[] = await response.json();
    
    // Validate and transform each doctor's data
    const validatedData = data.map(validateDoctor);
    console.log('Fetched and processed doctors:', validatedData);
    
    return validatedData;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return [];
  }
};