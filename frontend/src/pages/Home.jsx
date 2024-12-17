import React from 'react';
import { Link } from 'react-router-dom'; 

const Home = () => {

  return (
    <div className="p-6 bg-green-50 min-h-screen">
        <nav className="bg-green-900 -m-8 pt-8 text-white">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold">
            <Link to="/">Plant Care</Link>
          </h1>
          <div className="flex space-x-4">
            <Link to="/home" className="hover:underline">Home</Link>
            <Link to="/research-work" className="hover:underline">Research</Link>
            <Link to="/video-tutorials" className="hover:underline">Tutorials</Link>
            <Link to="/plants" className="hover:underline">Plants</Link>
            <Link to="/marketplace" className="hover:underline">MarketplacePage</Link>
            <Link to="/profile" className="hover:underline">User</Link>
          </div>
        </div>
      </nav>
      <h1 className="text-3xl font-bold text-green-800 pt-8 text-center my-8">Home page</h1>
    </div>
  );
};

export default Home;