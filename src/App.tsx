import { useContext } from 'react'
import './App.css'
import { CheckoutContext } from './context/CheckoutContext'
import ConnectWidget from './components/ConnectWidget';
import WalletWidget from './components/WalletWidget';
import SwapWidget from './components/SwapWidget';
import OnrampWidget from './components/OnrampWidget';
import BridgeWidget from './components/BridgeWidget';

function App() {
  const {
    widgetData: { 
      connectData: {
        show: showConnect
      },
      walletData: {
        show: showWallet
      },
      swapData: {
        show: showSwap
      },
      onrampData: {
        show: showOnramp
      },
      bridgeData: {
        show: showBridge
      }
    }, 
    setWidgetData} = useContext(CheckoutContext);

  function showConnectWidget() {
    setWidgetData((prev) => ({...prev, connectData: {params: {}, show: true}}));
  }

  function showWalletWidget() {
    setWidgetData((prev) => ({...prev, walletData: {params: {}, show: true}}));
  }

  function showSwapWidget() {
    setWidgetData((prev) => ({...prev, swapData: {params: {}, show: true}}));
  }

  function showBridgeWidget() {
    setWidgetData((prev) => ({...prev, bridgeData: {params: {}, show: true}}));
  }

  function showOnrampWidget() {
    setWidgetData((prev) => ({...prev, onrampData: {params: {}, show: true}}));
  }

  return (
    <div id="app">
      <h1>Immutable Checkout Example React</h1>
      <div id="button-container">
        <button onClick={showConnectWidget}>Show Connect</button>
        <button onClick={showWalletWidget}>Show Wallet</button>
        <button onClick={showSwapWidget}>Show Swap</button>
        <button onClick={showBridgeWidget}>Show Bridge</button>
        <button onClick={showOnrampWidget}>Show Onramp</button>
      </div>
      {showConnect && <ConnectWidget />}
      {showWallet && <WalletWidget />}
      {showSwap && <SwapWidget />}
      {showOnramp && <OnrampWidget />}
      {showBridge && <BridgeWidget />}
    </div>
  )
}

export default App
