import React from 'react';
import { Link } from 'react-router-dom';

const ResearchWork = () => {
  const researchWorks = [
    {
      title: 'Research on Aloe Vera Benefits',
      url: 'https://www.thedinglab.com/post/cultivating-success-mastering-the-art-of-plant-care-in-plant-biology-research',
    },
    {
      title: 'Plant Health Monitoring Techniques',
      url: 'https://pubs.acs.org/doi/10.1021/acsomega.0c05850',
    },
    {
      title: 'Sustainable Gardening Practices',
      url: 'https://upcyclethat.com/sustainable-gardening-practices/',
    },
    {
      title: 'Plant Growth and Fertilization',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7954289/',
    },
  ];

  return (
    <div className="research-work-page p-6 bg-green-50 min-h-screen">
      <h1 className="text-3xl font-bold text-green-800 text-center my-8">Plant Related Research Works</h1>
      
      <div className="research-list max-w-2xl mx-auto p-4">
        {researchWorks.map((research, index) => (
          <div key={index} className="research-item bg-green-100 p-4 rounded-lg shadow-md mb-4 hover:bg-green-200 transition">
            <h2 className="text-xl font-semibold text-green-700">{research.title}</h2>
            <a
              href={research.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-800"
            >
              {research.url}
            </a>
          </div>
        ))}
      </div>

      {/* Button to go back to Plant Profile page */}
      <div className="text-center mt-6">
        <Link to="/plantprofile" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
          Go Back to Plant Profile
        </Link>
      </div>
    </div>
  );
};

export default ResearchWork;