// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"; 

// ----------------------------------------------------------------------
const initialOptions = {
  "client-id": "ATxHp4nR2e3Ok5EIB1KiL8r17sVrTunp_qzS7tDu3D3Mynr7JVGHO6tBc6U4URNf_n8CSNfdsqlXEB6W",
  currency: "INR",
  intent: "capture",
  "data-client-token": "abc123xyz==",
};

export default function App() {
  return (
    <PayPalScriptProvider options={{ "client-id": "test" }}>
    <ThemeConfig>
    
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Router />
      <ToastContainer/>
    </ThemeConfig>
      </PayPalScriptProvider>
  );
}
