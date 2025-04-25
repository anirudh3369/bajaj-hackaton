import { Doctor, FilterState, ALL_SPECIALTIES } from '../types';

export const filterDoctors = (doctors: Doctor[], filters: FilterState): Doctor[] => {
  return doctors.filter((doctor) => {
    // Filter by search term
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const nameMatch = doctor.name.toLowerCase().includes(searchLower);
      const specialtyMatch = doctor.specialities.some(spec => 
        spec.name.toLowerCase().includes(searchLower)
      );
      const introMatch = doctor.doctor_introduction.toLowerCase().includes(searchLower);
      
      if (!nameMatch && !specialtyMatch && !introMatch) {
        return false;
      }
    }

    // Filter by consultation type
    if (filters.consultationType === 'VIDEO_CONSULT' && !doctor.isVideoConsultAvailable) {
      return false;
    }
    if (filters.consultationType === 'IN_CLINIC' && !doctor.isClinicAvailable) {
      return false;
    }

    // Filter by specialties
    if (
      filters.specialties.length > 0 &&
      !doctor.specialities.some((spec) => filters.specialties.includes(spec.name))
    ) {
      return false;
    }

    return true;
  });
};

export const sortDoctors = (doctors: Doctor[], sortBy: FilterState['sortBy']): Doctor[] => {
  if (!sortBy) return doctors;

  return [...doctors].sort((a, b) => {
    if (sortBy === 'fees') {
      // Extract numeric values from fees strings
      const aFees = parseInt(a.fees.replace(/[^\d]/g, ''), 10);
      const bFees = parseInt(b.fees.replace(/[^\d]/g, ''), 10);
      return aFees - bFees; // ascending order
    }
    if (sortBy === 'experience') {
      // Extract numeric values from experience strings
      const aExp = parseInt(a.experience.match(/\d+/)?.[0] || '0', 10);
      const bExp = parseInt(b.experience.match(/\d+/)?.[0] || '0', 10);
      return bExp - aExp; // descending order
    }
    return 0;
  });
};

export const getUniqueSpecialties = (doctors: Doctor[]): string[] => {
  // Return the predefined list of specialties
  return ALL_SPECIALTIES;
};

export const getSuggestions = (doctors: Doctor[], searchTerm: string): {
  doctors: Doctor[];
  specialists: string[];
} => {
  if (!searchTerm) return { doctors: [], specialists: [] };
  
  const searchLower = searchTerm.toLowerCase();
  
  // Filter doctors
  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchLower) ||
    doctor.doctor_introduction.toLowerCase().includes(searchLower)
  ).slice(0, 3);
  
  // Filter specialists
  const filteredSpecialists = ALL_SPECIALTIES
    .filter(specialty => specialty.toLowerCase().includes(searchLower))
    .slice(0, 3);
  
  return {
    doctors: filteredDoctors,
    specialists: filteredSpecialists
  };
};

export const buildQueryParams = (filters: FilterState): URLSearchParams => {
  const params = new URLSearchParams();
  
  if (filters.search) {
    params.set('search', filters.search);
  }
  
  if (filters.consultationType) {
    params.set('consultationType', filters.consultationType);
  }
  
  if (filters.specialties.length > 0) {
    params.set('specialties', filters.specialties.join(','));
  }
  
  if (filters.sortBy) {
    params.set('sortBy', filters.sortBy);
  }
  
  return params;
};

export const parseQueryParams = (search: string): FilterState => {
  const params = new URLSearchParams(search);
  
  const specialtiesParam = params.get('specialties');
  const specialties = specialtiesParam ? specialtiesParam.split(',') : [];
  
  return {
    search: params.get('search') || '',
    consultationType: (params.get('consultationType') as FilterState['consultationType']) || null,
    specialties,
    sortBy: (params.get('sortBy') as FilterState['sortBy']) || null,
  };
};