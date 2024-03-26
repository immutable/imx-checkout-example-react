import { useContext, useEffect } from 'react'
import { CheckoutContext } from '../context/CheckoutContext'
import { BridgeEventType, BridgeTransactionSent } from '@imtbl/sdk/checkout';

function BridgeWidget() {
  const {setWidgetData, widgets: {bridge}, widgetData} = useContext(CheckoutContext);
  const {bridgeData: {params}} = widgetData; 

  useEffect(() => {
    if(!bridge) return;
    bridge?.mount('bridge-target', params);

    bridge.addListener(BridgeEventType.CLOSE_WIDGET, () => {
      bridge.unmount();
      setWidgetData((prev) => ({
        ...prev,
        bridgeData: { 
          params: {}, 
          show: false
        }
        }))
    });
    bridge.addListener(BridgeEventType.TRANSACTION_SENT, (transactionSent: BridgeTransactionSent) => {
      console.log(transactionSent);
    });
    
    return () => {
      bridge.unmount();
    }
  }, [bridge, setWidgetData, params])

  return (
    <div id="bridge-target"></div>
  )
}

export default BridgeWidget