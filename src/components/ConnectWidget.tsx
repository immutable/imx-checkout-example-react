import { useContext, useEffect } from 'react'
import { CheckoutContext } from '../context/CheckoutContext'
import { ConnectEventType, ConnectionFailed, ConnectionSuccess } from '@imtbl/sdk/checkout';

function ConnectWidget() {
  const {widgets: {connect}, setWidgetData, widgetData: {connectData: {params}}} = useContext(CheckoutContext);

  useEffect(() => {
    if(!connect) return;

      connect?.mount('connect-target', params);

      connect.addListener(ConnectEventType.CLOSE_WIDGET, () => {
        setWidgetData((prev) => ({
          ...prev,
          connectData: {params: {}, show: false}
        }))
      });
      connect.addListener(ConnectEventType.SUCCESS, (success: ConnectionSuccess) => {
        console.log(success);
      });
      connect.addListener(ConnectEventType.FAILURE, (failure: ConnectionFailed) => {
        console.log(failure);
      });
    
    return () => {
      connect.unmount();
    }
  }, [connect, params, setWidgetData])

  return (
    <div id="connect-target"></div>
  )
}

export default ConnectWidget