import React from 'react';
import { useParams, Link } from 'react-router-dom';

const TherapistDetails = () => {
  const { id } = useParams();


  const therapist = {
    id: id,
    name: 'Esthera Jackson',
    email: 'esthera@gmail.com',
    specialization: 'Massage Therapist',
    experience: '4 Years'
  };

  return (
    <div className="p-5">
      <Link 
        to="/"
        className="mb-4 inline-block bg-gray-500 text-white px-4 py-2 rounded-full"
      >
        Back
      </Link>
      <div className="bg-white rounded-[15px] shadow-md p-5">
        <h1 className="text-xl font-bold mb-5">Therapist Details</h1>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
            <div>
              <p className="font-semibold text-lg">{therapist.name}</p>
              <p className="text-gray-500">{therapist.email}</p>
            </div>
          </div>
          <p><strong>Specialization:</strong> {therapist.specialization}</p>
          <p><strong>Experience:</strong> {therapist.experience}</p>
        </div>
      </div>
    </div>
  );
};

export default TherapistDetails;