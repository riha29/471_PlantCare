import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import UserProfile from './pages/UserProfile';
import PlantProfile from './pages/PlantProfile';
import EditPlantProfile from './pages/EditPlantProfile';
import ResearchWork from './pages/ResearchWork';
import VideoTutorials from './pages/VideoTutorials';
import MarketplacePage from './pages/MarketplacePage';
import PlantList from './pages/PlantList';
import TransactionPage from "./pages/TransactionPage";
import DashboardPage from "./pages/DashboardPage";



function App() {
  return (
      <Router>
        <Routes>
          <Route path='/home' element={<DashboardPage />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile" element={<UserProfile />} /> 
          <Route path="/plants" element={<PlantList />} />
          <Route path="/plant-profile/:id" element={<PlantProfile />} />
          <Route path="/edit-plant/:id" element={<EditPlantProfile />} />
          <Route path="/research-work" element={<ResearchWork />} />
          <Route path="/video-tutorials" element={<VideoTutorials/>} />
          <Route path='/marketplace' element={<MarketplacePage/>}/>
          <Route path="/transaction" element={<TransactionPage />} />
        </Routes>
      </Router>
  );
}

export default App;