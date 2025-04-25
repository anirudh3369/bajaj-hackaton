import React from 'react';
import { Doctor } from '../types';
import { Star, Video, MapPin } from 'lucide-react';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div 
      data-testid="doctor-card" 
      className="bg-white rounded-lg shadow-md p-4 mb-4 transition-transform hover:shadow-lg hover:-translate-y-1"
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 mb-4 md:mb-0 flex justify-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
            {doctor.photo ? (
              <img 
                src={doctor.photo} 
                alt={doctor.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-3xl font-bold text-gray-400">
                {doctor.name_initials}
              </span>
            )}
          </div>
        </div>

        <div className="md:w-3/4 md:pl-4">
          <h2 
            data-testid="doctor-name" 
            className="text-xl font-semibold text-gray-800 mb-1"
          >
            {doctor.name}
          </h2>
          
          <div 
            data-testid="doctor-specialty" 
            className="text-sm text-gray-600 mb-2"
          >
            {doctor.specialities.map(s => s.name).join(', ')}
          </div>
          
          <div className="mb-3 flex items-center">
            <div className="flex items-center bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded mr-2">
              <Star className="w-4 h-4 mr-1 text-yellow-500 fill-yellow-500" />
              <span>{doctor.rating}</span>
            </div>
            <div 
              data-testid="doctor-experience" 
              className="text-sm text-gray-600"
            >
              {doctor.experience}
            </div>
          </div>

          <div className="text-sm text-gray-600 mb-3">
            <p>{doctor.doctor_introduction}</p>
            <p className="mt-2">
              Languages: {doctor.languages.join(', ')}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {doctor.isVideoConsultAvailable && (
              <div className="flex items-center text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                <Video className="w-4 h-4 mr-1" />
                <span>Video Consult</span>
              </div>
            )}
            {doctor.isClinicAvailable && (
              <div className="flex items-center text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded">
                <MapPin className="w-4 h-4 mr-1" />
                <span>In Clinic</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <div 
              data-testid="doctor-fee" 
              className="text-lg font-semibold text-gray-900"
            >
              {doctor.fees}
            </div>
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;