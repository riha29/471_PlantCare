import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResearchData = () => {
  const [researchData, setResearchData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/signin'); // Redirect to signin if not logged in
    }

    // Dummy data for research work
    const data = [
      {
        id: 1,
        title: 'The Impact of Watering Frequency on Plant Growth',
        description:
          'A comprehensive study on how different watering schedules affect various types of plants.',
        link: 'https://medium.com/@karunakaran.m/secondary-research-on-plant-care-8cd6e734cf72',
        // href={link}
      },
      
    ];

    setResearchData(data); // Set dummy data to the state
  }, [navigate]);

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center">Plant Care Research & Insights</h2>
      {researchData.length > 0 ? (
        <ul className="space-y-6">
          {researchData.map((item) => (
            <li key={item.id} className="p-4 bg-gray-100 rounded-lg shadow">
              <h3 className="text-2xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-gray-700">{item.description}</p>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-blue-500 font-bold hover:underline"
              >
                Read More
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No research data available at the moment.</p>
      )}
    </div>
  );
};

export default ResearchData;
