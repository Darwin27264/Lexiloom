import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { AppTool } from './components/AppTool';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<AppTool />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
 