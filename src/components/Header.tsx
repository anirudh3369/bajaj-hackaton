import React, { useState, useRef, useEffect } from 'react';
import { Doctor } from '../types';
import { getSuggestions } from '../utils/filterUtils';
import { Search, User, Building2 } from 'lucide-react';

interface HeaderProps {
  doctors: Doctor[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({ doctors, searchTerm, onSearchChange }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<{
    doctors: Doctor[];
    specialists: string[];
  }>({ doctors: [], specialists: [] });
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const newSuggestions = getSuggestions(doctors, searchTerm);
      setSuggestions(newSuggestions);
      setShowSuggestions(newSuggestions.doctors.length > 0 || newSuggestions.specialists.length > 0);
    } else {
      setSuggestions({ doctors: [], specialists: [] });
      setShowSuggestions(false);
    }
  }, [searchTerm, doctors]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const handleInputFocus = () => {
    if (searchTerm && (suggestions.doctors.length > 0 || suggestions.specialists.length > 0)) {
      setShowSuggestions(true);
    }
  };

  const handleSuggestionClick = (value: string) => {
    onSearchChange(value);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setShowSuggestions(false);
    }
  };

  return (
    <header className="bg-white shadow-md py-4 sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-green-600 text-center">Asclepius - Doctor Connect</h1>
          <div className="relative w-full max-w-md mx-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                ref={inputRef}
                type="text"
                data-testid="autocomplete-input"
                className="w-full p-3 pl-10 pr-4 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-dakgreen-500 focus:border-transparent"
                placeholder="Search for doctors, specialists, or clinics..."
                value={searchTerm}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onKeyDown={handleKeyDown}
              />
            </div>
            {showSuggestions && (
              <div 
                ref={suggestionsRef}
                className="absolute mt-1 w-full bg-white rounded-lg shadow-lg z-10 border border-gray-200 divide-y divide-gray-100"
              >
                {suggestions.doctors.length > 0 && (
                  <div className="p-2">
                    <div className="text-xs font-semibold text-gray-500 px-2 mb-1">Doctors</div>
                    {suggestions.doctors.map((doctor) => (
                      <div
                        key={doctor.id}
                        data-testid="suggestion-item"
                        className="flex items-center p-2 hover:bg-gray-100 cursor-pointer rounded"
                        onClick={() => handleSuggestionClick(doctor.name)}
                      >
                        <User className="w-4 h-4 mr-2 text-gray-400" />
                        <div>
                          <div className="text-sm font-medium">{doctor.name}</div>
                          <div className="text-xs text-gray-500">
                            {doctor.specialities.map(s => s.name).join(', ')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {suggestions.specialists.length > 0 && (
                  <div className="p-2">
                    <div className="text-xs font-semibold text-gray-500 px-2 mb-1">Specialists</div>
                    {suggestions.specialists.map((specialty) => (
                      <div
                        key={specialty}
                        data-testid="suggestion-item"
                        className="flex items-center p-2 hover:bg-gray-100 cursor-pointer rounded"
                        onClick={() => handleSuggestionClick(specialty)}
                      >
                        <Building2 className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="text-sm">{specialty}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;