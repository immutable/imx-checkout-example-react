import { useContext, useEffect } from 'react'
import { CheckoutContext } from '../context/CheckoutContext'
import { ConnectEventType, ConnectionFailed, ConnectionSuccess } from '@imtbl/sdk/checkout';

function ConnectWidget() {
  const {widgets: {connect}} = useContext(CheckoutContext);

  useEffect(() => {
    if(!connect) return;
    connect?.mount('connect-target', {});

    connect.addListener(ConnectEventType.CLOSE_WIDGET, () => connect.unmount());
    connect.addListener(ConnectEventType.SUCCESS, (success: ConnectionSuccess) => {
      console.log(success);
    });
    connect.addListener(ConnectEventType.FAILURE, (failure: ConnectionFailed) => {
      console.log(failure);
    });

    return () => {
      connect.unmount();
    }
  }, [connect])

  return (
    <div id="connect-target"></div>
  )
}

export default ConnectWidget