// React Components Imports
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
// Pages Imports
import DashboardPage from "./pages/DashBoard/DashboardPage";
import DevicesPage from "./pages/Devices/DevicePage";
import AutomationPage from "./pages/Automation/AutomationPage";
import SettingsPage from "./pages/Settings/SettingsPage";
import AboutPage from "./pages/About/AboutPage";

// Custom React Components Imports

const App = () => {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route exact path="/" element={<DashboardPage />} />
          <Route exact path="/devices" element={<DevicesPage />} />
          <Route exact path="/automation" element={<AutomationPage />} />
          <Route exact path="/settings" element={<SettingsPage />} />
          <Route exact path="/about" element={<AboutPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
