import 'primereact/resources/themes/bootstrap4-light-blue/theme.css'
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
import RegistrationsAdmin from './pages/admin/registrations/Registrations';
import CollageMedia from './pages/admin/media/CollageMedia';
import { CollageProvider } from './contexts/CollageContext';
import CollageDetail from './pages/media/CollageDetail';
import { PopupProvider } from './contexts/PopupContext';
import Leaders from './pages/leiding/Leaders';
import LeadersAdmin from './pages/admin/leaders/Leaders';

const App = () => {

	return (
		<BrowserRouter>
			<PopupProvider>
				<Routes>
					{/* Vaste routes */}
					<Route path="/" element={<Home />} />
					<Route path="/home" element={<Home />} />
					<Route path="/leiding" element={<Leaders />} />
					<Route path="/evenementen" element={<Events />} />
					<Route path='/evenement/:id' element={<EventDetail />} />
					<Route path="/media" element={<CollageProvider><Media /></CollageProvider>} />
					<Route path="/collage/:id" element={<CollageDetail  />} />
					<Route path="/inschrijven" element={<Register />} />
					<Route path="/inschrijven/bevestiging" element={<RegisterConfirmation />} />
					<Route path="/contact" element={<Contact />} />

					{/* Admin */}
					<Route path="/admin" element={<AccountProvider><DashboardAdmin /></AccountProvider>} />
					<Route path="/admin/evenementen" element={<AccountProvider><EventsAdmin /></AccountProvider>} />
					<Route path="/admin/media" element={<AccountProvider><CollageProvider isAdmin><MediaAdmin/></CollageProvider></AccountProvider>} />
					<Route path="/admin/media/:id" element={<AccountProvider><CollageMedia /></AccountProvider>} />
					<Route path="/admin/inschrijvingen" element={<AccountProvider><RegistrationsAdmin /></AccountProvider>} />
					<Route path='/admin/leiding' element={<AccountProvider><LeadersAdmin /></AccountProvider>} />
					<Route path="/admin/*" element={<AccountProvider><DashboardAdmin /></AccountProvider>} />

					{/* Fallback */}
					<Route path="/*" element={<NotFound />} />
				</Routes>
			</PopupProvider>
		</BrowserRouter>
	);
}

export default App;