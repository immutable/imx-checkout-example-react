import { useContext, useEffect } from 'react'
import { CheckoutContext } from '../context/CheckoutContext'
import { BridgeEventType, BridgeTransactionSent } from '@imtbl/sdk/checkout';

function BridgeWidget() {
  const {widgets: {bridge}} = useContext(CheckoutContext);

  useEffect(() => {
    if(!bridge) return;
    bridge?.mount('bridge-target');

    bridge.addListener(BridgeEventType.CLOSE_WIDGET, () => bridge.unmount());
    bridge.addListener(BridgeEventType.TRANSACTION_SENT, (transactionSent: BridgeTransactionSent) => {
      console.log(transactionSent);
    });
    
    return () => {
      bridge.unmount();
    }
  }, [bridge])

  return (
    <div id="bridge-target"></div>
  )
}

export default BridgeWidget