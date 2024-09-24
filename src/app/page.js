import PaymentConfirmationPage from './components/PaymentConfirmation';
import '@fortawesome/fontawesome-free/css/all.min.css';

import CapabilityStatement from './components/CapabilityStatement';
import SearchWithFilter from './components/SearchWithFilter';
import TemplateSelection from './components/TemplateSelection';

import { AppProvider } from './context/AppContext';


export default function Home() {
  return (
    <AppProvider>
      <div>
        <PaymentConfirmationPage />
        <CapabilityStatement />
        <TemplateSelection />
        <SearchWithFilter />
      </div>
    </AppProvider>
  );
}
