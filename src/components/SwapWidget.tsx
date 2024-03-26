import { useContext, useEffect } from 'react'
import { CheckoutContext } from '../context/CheckoutContext'
import { OrchestrationEventType, RequestBridgeEvent, RequestOnrampEvent, SwapEventType, SwapSuccess } from '@imtbl/sdk/checkout';

function SwapWidget() {
  const {widgets: {swap}, widgetData, setWidgetData} = useContext(CheckoutContext);
  const {swapData: {params}} = widgetData; 

  useEffect(() => {
    if(!swap) return;
    swap?.mount('swap-target', params);


    swap.addListener(SwapEventType.SUCCESS, (data: SwapSuccess) => {
      console.log("SWAP SUCCESS", data);
    })

    swap.addListener(OrchestrationEventType.REQUEST_BRIDGE, (data: RequestBridgeEvent) => {
      swap.unmount();
      setWidgetData((prev) => ({
        ...prev,
        swapData: {params: {}, show: false},
        bridgeData: {
          params: {
            tokenAddress: data.tokenAddress,
            amount: data.amount
          },
          show: true
        }
      }))
    })

    swap.addListener(OrchestrationEventType.REQUEST_ONRAMP, (data: RequestOnrampEvent) => {
      swap.unmount();
      setWidgetData((prev) => ({
        ...prev,
        swapData: {params: {}, show: false},
        onrampData: {
          params: {
            tokenAddress: data.tokenAddress,
            amount: data.amount
          },
          show: true
        }
      }))
    })

    swap.addListener(SwapEventType.CLOSE_WIDGET, () => {
      swap.unmount();
      setWidgetData((prev) => ({
        ...prev,
        swapData: {params: {}, show: false}
      }))
    });
    
    return () => {
      swap.unmount();
    }
  }, [swap, params, setWidgetData])

  return (
    <div id="swap-target"></div>
  )
}

export default SwapWidget