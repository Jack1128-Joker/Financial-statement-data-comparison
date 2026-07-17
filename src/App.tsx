import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import IntersectObserver from '@/components/common/IntersectObserver';
import { Toaster } from '@/components/ui/sonner';
import { DataProvider } from '@/contexts/DataContext';
import AppLayout from '@/components/layouts/AppLayout';

import HomePage from '@/pages/HomePage';
import DataEntryPage from '@/pages/DataEntryPage';
import DataImportPage from '@/pages/DataImportPage';
import ComparisonPage from '@/pages/ComparisonPage';
import TrendsPage from '@/pages/TrendsPage';
import RatiosPage from '@/pages/RatiosPage';
import DataListPage from '@/pages/DataListPage';

const App: React.FC = () => {
  return (
    <Router>
      <DataProvider>
        <IntersectObserver />
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/data-entry" element={<DataEntryPage />} />
            <Route path="/data-import" element={<DataImportPage />} />
            <Route path="/comparison" element={<ComparisonPage />} />
            <Route path="/trends" element={<TrendsPage />} />
            <Route path="/ratios" element={<RatiosPage />} />
            <Route path="/data-list" element={<DataListPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </DataProvider>
    </Router>
  );
};

export default App;
