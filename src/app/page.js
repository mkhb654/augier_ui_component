import PaymentConfirmation from './components/PaymentConfirmation';
import CapabilityStatement from './components/CapabilityStatement';
import SearchWithFilter  from "./components/SearchWithFilter";
import PrivacyStatementPopup from './components/PrivacyStatementPopUp';
import TemplateSelection from './components/templateSelection';
import UploadPopup from './components/UploadPopUp';

export default function Home() {
  return (
    <div>
      <PaymentConfirmation/>
      <CapabilityStatement/>
      <TemplateSelection/>
      <SearchWithFilter/>
    </div>
  );
}


