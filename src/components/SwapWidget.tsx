import { useContext, useEffect } from 'react'
import { CheckoutContext } from '../context/CheckoutContext'
import { SwapEventType } from '@imtbl/sdk/checkout';

function SwapWidget() {
  const {widgets: {swap}} = useContext(CheckoutContext);

  useEffect(() => {
    if(!swap) return;
    swap?.mount('swap-target');

    swap.addListener(SwapEventType.CLOSE_WIDGET, () => swap.unmount());
    
    return () => {
      swap.unmount();
    }
  }, [swap])

  return (
    <div id="swap-target"></div>
  )
}

export default SwapWidget