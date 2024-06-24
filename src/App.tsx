import 'primeicons/primeicons.css';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home';
import EventDetail from './pages/events/EventDetail';
import Events from './pages/events/Events';
import Media from './pages/media/Media';
import Contact from './pages/contact/Contact';
import Register from './pages/inschrijven/Register';
import RegisterConfirmation from './pages/inschrijven/bevestiging/RegisterConfirmation';
import NotFound from './pages/notfound/NotFound';
import { AccountProvider } from './contexts/AccountContext';
import DashboardAdmin from './pages/admin/dashboard/Dashboard';
import EventsAdmin from './pages/admin/events/Events';
import MediaAdmin from './pages/admin/media/Media';
import InschrijvingenAdmin from './pages/admin/registrations/Inschrijvingen';

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
        <Route path="/inschrijven" element={<Register />} />
        <Route path="/inschrijven/bevestiging" element={<RegisterConfirmation />} />
        <Route path="/contact" element={<Contact />} />

        {/* Admin */}
        <Route path="/admin" element={<AccountProvider><DashboardAdmin /></AccountProvider>} />
        <Route path="/admin/evenementen" element={<AccountProvider><EventsAdmin /></AccountProvider>} />
        <Route path="/admin/media" element={<AccountProvider><MediaAdmin/></AccountProvider>} />
        <Route path="/admin/inschrijvingen" element={<AccountProvider><InschrijvingenAdmin /></AccountProvider>} />
        <Route path="/admin/*" element={<AccountProvider><DashboardAdmin /></AccountProvider>} />

        {/* Fallback */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;