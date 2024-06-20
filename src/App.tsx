import 'primereact/resources/themes/bootstrap4-light-blue/theme.css'
import 'primeicons/primeicons.css';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home';
import EventDetail from './pages/events/EventDetail';
import Events from './pages/events/Events';
import Media from './pages/media/Media';
import Contact from './pages/contact/Contact';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        {/* Vaste routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/evenementen" element={<Events />} />
        <Route path='/evenement/:id' element={<EventDetail />} />
        <Route path="/media" element={<Media />} />
        <Route path="/media/:id" element={<Media />} />
        <Route path="/contact" element={<Contact />} />
        {/* Fallback */}
        <Route path="/*" element={<div>notfound</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;