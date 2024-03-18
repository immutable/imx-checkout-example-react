import { useContext, useEffect } from 'react'
import { CheckoutContext } from '../context/CheckoutContext'
import { OnRampEventType, OnRampSuccess } from '@imtbl/sdk/checkout';

function OnrampWidget() {
  const {widgets: {onramp}} = useContext(CheckoutContext);

  useEffect(() => {
    if(!onramp) return;
    onramp?.mount('onramp-target');

    onramp.addListener(OnRampEventType.CLOSE_WIDGET, () => onramp.unmount());
    onramp.addListener(OnRampEventType.SUCCESS, (success: OnRampSuccess) => {
      console.log(success);
    });
    
    return () => {
      onramp.unmount();
    }
  }, [onramp])

  return (
    <div id="onramp-target"></div>
  )
}

export default OnrampWidget