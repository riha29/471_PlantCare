import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import UserProfile from './pages/UserProfile';
import PlantProfile from './pages/PlantProfile';
import ResearchWork from './pages/ResearchWork';
import EditPlantProfile from './pages/EditPlantProfile';
import VideoTutorials from './pages/VideoTutorials';
import TransactionPage from './pages/TransactionPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile" element={<UserProfile />} /> 
        <Route path="/plant-profile" element={<PlantProfile />} /> 
        <Route path="/edit-plant" element={<EditPlantProfile />} />
        <Route path="/research-work" element={<ResearchWork />} />
        <Route path="/video-tutorials" element={<VideoTutorials/>} />
        <Route path="/marketplace" element={<TransactionPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;