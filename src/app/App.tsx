import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@components/Layout';

import Portfolio from '@pages/Portfolio.tsx';
import Funds from '@pages/Funds.tsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/portfolio" />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="funds" element={<Funds />} />

        <Route path="*" element={<Navigate to="/funds" />} />
      </Route>
    </Routes>
  );
}

export default App;
