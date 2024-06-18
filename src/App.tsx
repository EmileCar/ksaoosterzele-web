import 'primereact/resources/themes/bootstrap4-light-blue/theme.css'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home';
import About from './pages/about/About';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        {/* Vaste routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />

        {/* Fallback */}
        <Route path="/*" element={<div>notfound</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;