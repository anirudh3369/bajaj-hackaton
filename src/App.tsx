import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Doctor, FilterState } from './types';
import { fetchDoctors } from './api/doctorsApi';
import { filterDoctors, sortDoctors, buildQueryParams, parseQueryParams } from './utils/filterUtils';
import Header from './components/Header';
import FilterPanel from './components/FilterPanel';
import DoctorList from './components/DoctorList';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Parse initial filters from URL
  const initialFilters = parseQueryParams(location.search);
  
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  
  // Fetch doctors data
  useEffect(() => {
    const getDoctors = async () => {
      try {
        setLoading(true);
        const data = await fetchDoctors();
        setDoctors(data);
        setError(null);
      } catch (err) {
        setError('Failed to load doctors. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    getDoctors();
  }, []);
  
  // Update URL when filters change
  useEffect(() => {
    const queryParams = buildQueryParams(filters);
    navigate({ search: queryParams.toString() }, { replace: true });
  }, [filters, navigate]);
  
  // Handle URL changes (browser back/forward)
  useEffect(() => {
    const newFilters = parseQueryParams(location.search);
    setFilters(newFilters);
  }, [location.search]);
  
  // Apply filters and sorting
  const filteredDoctors = sortDoctors(
    filterDoctors(doctors, filters),
    filters.sortBy
  );
  
  // Filter handlers
  const handleSearchChange = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value }));
  };
  
  const handleConsultationTypeChange = (type: FilterState['consultationType']) => {
    setFilters((prev) => ({ 
      ...prev, 
      consultationType: prev.consultationType === type ? null : type 
    }));
  };
  
  const handleSpecialtyChange = (specialty: string) => {
    setFilters((prev) => {
      const specialties = prev.specialties.includes(specialty)
        ? prev.specialties.filter((s) => s !== specialty)
        : [...prev.specialties, specialty];
      
      return { ...prev, specialties };
    });
  };
  
  const handleSortChange = (sortOption: FilterState['sortBy']) => {
    setFilters((prev) => ({ 
      ...prev, 
      sortBy: prev.sortBy === sortOption ? null : sortOption 
    }));
  };
  
  const handleClearFilters = () => {
    setFilters({
      search: '',
      consultationType: null,
      specialties: [],
      sortBy: null,
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        doctors={doctors}
        searchTerm={filters.search}
        onSearchChange={handleSearchChange}
      />
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="md:w-1/4">
            {loading ? (
              <div className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ) : (
              <FilterPanel
                doctors={doctors}
                consultationType={filters.consultationType}
                specialties={filters.specialties}
                sortBy={filters.sortBy}
                onConsultationTypeChange={handleConsultationTypeChange}
                onSpecialtyChange={handleSpecialtyChange}
                onSortChange={handleSortChange}
                onClearFilters={handleClearFilters}
              />
            )}
          </aside>
          
          <div className="md:w-3/4">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                    <div className="flex">
                      <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
                      <div className="flex-1">
                        <div className="h-5 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
                        <div className="flex justify-between">
                          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="bg-red-100 p-4 rounded-lg text-red-700">
                {error}
              </div>
            ) : (
              <DoctorList doctors={filteredDoctors} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;