import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import UserProfile from './pages/UserProfile';
import ResearchData from './pages/ResearchData'; // Import ResearchWork page


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile" element={<UserProfile />} /> {/* UserProfile page */}
        <Route path="/research" element={<ResearchData />} />
      </Routes>
    </Router>
  );
}

export default App;
