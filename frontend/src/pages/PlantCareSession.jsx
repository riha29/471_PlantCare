import React from 'react';
import { Link } from 'react-router-dom';

const PlantCareSession = () => {
  
  const experts = [
    {
      name: 'Dr. Emilia Jackson',
      expertise: 'Fertilization & Growth',
      zoomLink: 'https://zoom.us/j/1234567890', 
      image: 'https://media.istockphoto.com/id/1346711310/photo/portrait-of-smiling-female-doctor-wearing-uniform-standing.jpg?s=612x612&w=0&k=20&c=nPsBL7HwQ7y14HP6J7lcCyKl51X5pPSPGnweXHFzT9o=', // Replace with the actual image URL
      freeTime: 'Monday - Friday, 2 PM - 5 PM',
    },
    {
      name: 'Mr. John week',
      expertise: 'Pest Control & Soil Management',
      zoomLink: 'https://zoom.us/j/9876543210', 
      image: 'https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small_2x/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg', // Replace with the actual image URL
      freeTime: 'Tuesday - Saturday, 10 AM - 1 PM',
    },
    {
      name: 'Mr. Tom Hiddleston',
      expertise: 'Plant Health Monitoring',
      zoomLink: 'https://zoom.us/j/5678901234', 
      image: 'https://static.vecteezy.com/system/resources/previews/007/421/470/non_2x/handsome-cheerful-bearded-man-smiles-gladfully-dressed-in-casual-white-t-shirt-being-in-good-mood-poses-against-blue-background-with-copy-space-glad-european-guy-with-stubble-stands-indoor-free-photo.jpg', // Replace with the actual image URL
      freeTime: 'Wednesday - Sunday, 4 PM - 7 PM',
    },
  ];

  return (
    <div className="plant-care-session bg-green-50 p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-green-800 text-center mb-8">
        Plant Care Session
      </h1>
      <p className="text-lg text-green-700 text-center mb-8">
        Premium users can consult with our plant experts for personalized care sessions. 
        Book your session now!
      </p>
      
      <div className="expert-list max-w-4xl mx-auto">
        {experts.map((expert, index) => (
          <div
            key={index}
            className="expert-card bg-white p-6 rounded-lg shadow-md mb-6 flex items-center hover:bg-green-100 transition"
          >
            {/* Expert Image */}
            <img
              src={expert.image}
              alt={`${expert.name}`}
              className="w-24 h-24 rounded-full object-cover mr-6"
            />
            
            {/* Expert Details */}
            <div>
              <h2 className="text-2xl font-semibold text-green-700">
                {expert.name}
              </h2>
              <p className="text-green-600 mb-2">
                <strong>Expertise:</strong> {expert.expertise}
              </p>
              <p className="text-green-600 mb-2">
                <strong>Available:</strong> {expert.freeTime}
              </p>
              <button
                onClick={() => window.open(expert.zoomLink, '_blank')}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Join Zoom Session
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Button to navigate back */}
      <div className="text-center mt-6">
        <Link
          to="/plantprofile"
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Back to Plant Profile
        </Link>
      </div>
    </div>
  );
};

export default PlantCareSession;