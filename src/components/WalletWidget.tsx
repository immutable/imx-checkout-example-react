import { useContext, useEffect } from 'react'
import { CheckoutContext } from '../context/CheckoutContext'
import { WalletEventType } from '@imtbl/sdk/checkout';

function WalletWidget() {
  const {widgets: {wallet}} = useContext(CheckoutContext);

  useEffect(() => {
    if(!wallet) return;
    wallet?.mount('wallet-target');

    wallet.addListener(WalletEventType.CLOSE_WIDGET, () => wallet.unmount());
    
    return () => {
      wallet.unmount();
    }
  }, [wallet])

  return (
    <div id="wallet-target"></div>
  )
}

export default WalletWidget