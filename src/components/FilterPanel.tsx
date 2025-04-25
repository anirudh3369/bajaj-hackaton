import React from 'react';
import { ConsultationType, Doctor, SortOption } from '../types';
import { getUniqueSpecialties } from '../utils/filterUtils';

interface FilterPanelProps {
  doctors: Doctor[];
  consultationType: ConsultationType;
  specialties: string[];
  sortBy: SortOption;
  onConsultationTypeChange: (type: ConsultationType) => void;
  onSpecialtyChange: (specialty: string) => void;
  onSortChange: (sortOption: SortOption) => void;
  onClearFilters: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  doctors,
  consultationType,
  specialties,
  sortBy,
  onConsultationTypeChange,
  onSpecialtyChange,
  onSortChange,
  onClearFilters,
}) => {
  const uniqueSpecialties = getUniqueSpecialties(doctors);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
        <button
          onClick={onClearFilters}
          className="text-sm text-green-600 hover:text-green-800"
        >
          Clear All
        </button>
      </div>

      {/* Consultation Mode Filter */}
      <div className="mb-6">
        <h3 
          data-testid="filter-header-moc" 
          className="text-md font-medium text-gray-700 mb-2"
        >
          Consultation Mode
        </h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="consultationType"
              data-testid="filter-video-consult"
              checked={consultationType === 'VIDEO_CONSULT'}
              onChange={() => onConsultationTypeChange('VIDEO_CONSULT')}
              className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
            />
            <span className="text-sm text-gray-700">Video Consult</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="consultationType"
              data-testid="filter-in-clinic"
              checked={consultationType === 'IN_CLINIC'}
              onChange={() => onConsultationTypeChange('IN_CLINIC')}
              className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
            />
            <span className="text-sm text-gray-700">In Clinic</span>
          </label>
        </div>
      </div>

      {/* Specialty Filter */}
      <div className="mb-6">
        <h3 
          data-testid="filter-header-speciality" 
          className="text-md font-medium text-gray-700 mb-2"
        >
          Speciality
        </h3>
        <div className="max-h-48 overflow-y-auto space-y-2 pr-2">
          {uniqueSpecialties.map((specialty) => (
            <label key={specialty} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                data-testid={`filter-specialty-${specialty.replace('/', '-')}`}
                checked={specialties.includes(specialty)}
                onChange={() => onSpecialtyChange(specialty)}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">{specialty}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sort Filter */}
      <div>
        <h3 
          data-testid="filter-header-sort" 
          className="text-md font-medium text-gray-700 mb-2"
        >
          Sort By
        </h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="sortBy"
              data-testid="sort-fees"
              checked={sortBy === 'fees'}
              onChange={() => onSortChange('fees')}
              className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
            />
            <span className="text-sm text-gray-700">Fees (Low to High)</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="sortBy"
              data-testid="sort-experience"
              checked={sortBy === 'experience'}
              onChange={() => onSortChange('experience')}
              className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
            />
            <span className="text-sm text-gray-700">Experience (High to Low)</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;