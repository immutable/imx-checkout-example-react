import { useContext, useEffect } from 'react'
import { CheckoutContext } from '../context/CheckoutContext'
import { OrchestrationEventType, RequestBridgeEvent, RequestOnrampEvent, RequestSwapEvent, WalletEventType } from '@imtbl/sdk/checkout';

function WalletWidget() {
  const {checkout, setWidgetData, widgets: {
    wallet
  }, widgetData} = useContext(CheckoutContext);
  const {walletData: {params}} = widgetData; 

  useEffect(() => {
    if(!wallet || !checkout) return;
    wallet?.mount('wallet-target', params);

    wallet.addListener(WalletEventType.CLOSE_WIDGET, () => {
      setWidgetData((prev) => ({
        ...prev,
        walletData: {params: {}, show: false},
      }))
    });
    wallet.addListener(WalletEventType.DISCONNECT_WALLET, () => {
      checkout?.passport?.logout();
    });
    wallet.addListener(OrchestrationEventType.REQUEST_SWAP, (data: RequestSwapEvent) => {
      setWidgetData((prev) => ({
        ...prev,
        walletData: {params: {},show: false}, 
        swapData: {
          params: { 
            fromTokenAddress: data.fromTokenAddress,
            toTokenAddress: data.toTokenAddress,
            amount: data.amount
          }, 
          show: true
        }
      }))
    });

    wallet.addListener(OrchestrationEventType.REQUEST_BRIDGE, (data: RequestBridgeEvent) => {
      setWidgetData((prev) => ({
        ...prev,
        walletData: {params: {}, show: false}, 
        bridgeData: {
          params: { 
            tokenAddress: data.tokenAddress,
            amount: data.amount
          }, 
          show: true
        }
      }))
    })

    wallet.addListener(OrchestrationEventType.REQUEST_ONRAMP, (data: RequestOnrampEvent) => {
      setWidgetData((prev) => ({
        ...prev, 
        walletData: {params: {}, show: false }, 
        onrampData: {
          params: { 
            tokenAddress: data.tokenAddress,
            amount: data.amount
          }, 
          show: true
        }
      }))
    })
    
    return () => {
      wallet.unmount();
    }
  }, [checkout, wallet, params, setWidgetData])

  return (
    <div id="wallet-target"></div>
  )
}

export default WalletWidget