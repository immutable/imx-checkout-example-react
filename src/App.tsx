import './App.css'
import {checkout} from '@imtbl/sdk';
import { CheckoutProvider } from './context/CheckoutContext';
import ConnectWidget from './components/ConnectWidget';
import WalletWidget from './components/WalletWidget';
import SwapWidget from './components/SwapWidget';
import BridgeWidget from './components/BridgeWidget';
import OnrampWidget from './components/OnrampWidget';
import { Environment } from '@imtbl/sdk/config';


const applicationEnvironment = Environment.SANDBOX;

// If adding Passport - Create Passport instance and add to Checkout instance
// const passportInstance = new passport.Passport({
//   baseConfig: new ImmutableConfiguration({ environment: applicationEnvironment }),
//   clientId: '', /** clientId from https://hub.immutable.com */
//   redirectUri: '', /** redirectUri from https://hub.immutable.com */
//   logoutRedirectUri: '', /** logoutRedirectUri from https://hub.immutable.com */
//   audience: 'platform_api',
//   scope: 'openid offline_access email transact',
// });

// Create Checkout instance
const checkoutInstance = new checkout.Checkout({
  baseConfig: {environment: applicationEnvironment},
  publishableKey: undefined, // get publishable key at https://hub.immutable.com
  passport: undefined, // configure application for Passport at https://hub.immutable.com
});

function App() {

  // Test each widget by showing each one
  const showConnect = false;
  const showWallet = true;
  const showSwap = false;
  const showBridge = false;
  const showOnramp = false;

  return (
    <CheckoutProvider checkout={checkoutInstance}>
    <div id="app">
      <h1>Immutable Checkout Example React</h1>
      {showConnect && <ConnectWidget />}
      {showWallet && <WalletWidget />}
      {showSwap && <SwapWidget />}
      {showBridge && <BridgeWidget />}
      {showOnramp && <OnrampWidget />}
    </div>
    </CheckoutProvider>
  )
}

export default App
