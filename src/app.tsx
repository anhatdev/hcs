import React from 'react';
import { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { NavigationProvider } from './contexts/NavigationContext';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';
import MedicalRecords from './pages/MedicalRecords';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'patients':
        return <Patients onNavigate={handleNavigate} />;
      case 'appointments':
        return <Appointments onNavigate={handleNavigate} />;
      case 'records':
        return <MedicalRecords onNavigate={handleNavigate} />;
      case 'reports':
        return <Reports onNavigate={handleNavigate} />;
      case 'settings':
        return <Settings onNavigate={handleNavigate} />;
      case 'notifications':
        return <Notifications onNavigate={handleNavigate} />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <LanguageProvider>
      <NavigationProvider currentPage={currentPage} onNavigate={handleNavigate}>
        {renderPage()}
      </NavigationProvider>
    </LanguageProvider>
  );
}

export default App;