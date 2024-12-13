import React from 'react';
import { Link } from 'react-router-dom';

const ResearchWork = () => {
  const researchWorks = [
    {
      title: 'Research on Aloe Vera Benefits',
      thumbnail: 'https://via.placeholder.com/150?text=Aloe+Vera',
      url: 'https://www.thedinglab.com/post/cultivating-success-mastering-the-art-of-plant-care-in-plant-biology-research',
    },
    {
      title: 'Plant Health Monitoring Techniques',
      thumbnail: 'https://via.placeholder.com/150?text=Plant+Health',
      url: 'https://pubs.acs.org/doi/10.1021/acsomega.0c05850',
    },
    {
      title: 'Sustainable Gardening Practices',
      thumbnail: 'https://via.placeholder.com/150?text=Gardening',
      url: 'https://upcyclethat.com/sustainable-gardening-practices/',
    },
    {
      title: 'Plant Growth and Fertilization',
      thumbnail: 'https://via.placeholder.com/150?text=Fertilization',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7954289/',
    },
  ];

  return (
    <div className="p-6 bg-green-50 min-h-screen">
      <h1 className="text-3xl font-bold text-green-800 text-center my-8">Plant Related Research Works</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {researchWorks.map((research, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={research.thumbnail}
              alt={`${research.title} Thumbnail`}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-green-800 mb-2">{research.title}</h2>
              <a
                href={research.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Read Full Paper
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Button to go back to Plant Profile page */}
      <div className="text-center mt-8">
        <Link to="/plantprofile" className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
          Go Back to Plant Profile
        </Link>
      </div>
    </div>
  );
};

export default ResearchWork;
