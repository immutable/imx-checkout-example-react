import { checkout } from "@imtbl/sdk";
import { BridgeWidgetParams, ConnectWidgetParams, OnRampWidgetParams, SwapWidgetParams, WalletWidgetParams, Widget, WidgetTheme, WidgetType } from "@imtbl/sdk/checkout";
import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";

export interface WidgetData {
  connectData: {
    params: ConnectWidgetParams,
    show: boolean;
  } 
  walletData: {
    params: WalletWidgetParams,
    show: boolean
  };
  swapData: {
    params: SwapWidgetParams,
    show: boolean,
  } 
  bridgeData: {
    params: BridgeWidgetParams,
    show: boolean,
  } 
  onrampData: {
    params: OnRampWidgetParams,
    show: boolean;
  } 
}

export interface Widgets {
  connect?: Widget<WidgetType.CONNECT>;
  wallet?: Widget<WidgetType.WALLET>;
  swap?: Widget<WidgetType.SWAP>;
  bridge?: Widget<WidgetType.BRIDGE>;
  onramp?: Widget<WidgetType.ONRAMP>;
}

export interface CheckoutContextState {
  checkout?: checkout.Checkout;
  widgets: Widgets;
  widgetData: WidgetData;
  setWidgetData: Dispatch<SetStateAction<WidgetData>>;
  widgetsFactory?: ImmutableCheckoutWidgets.WidgetsFactory;
}

const initalWidgetsData = {
  connectData: {
    params: {},
    show: false,
  },
  walletData: {
    params: {},
    show: false,
  },
  swapData: {
    params: {},
    show: false,
  },
  bridgeData: {
    params: {},
    show: false,
  },
  onrampData: {
    params: {},
    show: false,
  }
};

export const CheckoutContext = createContext<CheckoutContextState>({
  widgets: {
    connect: undefined,
    wallet: undefined,
    swap: undefined,
    bridge: undefined,
    onramp: undefined,
  },
  widgetData: initalWidgetsData,
  setWidgetData: () => {}
});


export interface CheckoutProvider {
  children: ReactNode;
  checkout: checkout.Checkout;
}
export function CheckoutProvider({ children, checkout }: CheckoutProvider) {
  const [widgetsFactory, setWidgetsFactory] = useState<ImmutableCheckoutWidgets.WidgetsFactory>();
  const [widgets, setWidgets] = useState<Widgets>({});
  const [widgetData, setWidgetData] = useState<WidgetData>(initalWidgetsData);

  useEffect(() => {
    // Initialise widgets and create all widgets at beginning of application
    checkout.widgets({ config: {theme: WidgetTheme.DARK}})
    .then((widgetsFactory: ImmutableCheckoutWidgets.WidgetsFactory) => {
      const connect = widgetsFactory.create(WidgetType.CONNECT, {});
      const wallet = widgetsFactory.create(WidgetType.WALLET, {});
      const swap = widgetsFactory.create(WidgetType.SWAP, {});
      const bridge = widgetsFactory.create(WidgetType.BRIDGE, {});
      const onramp = widgetsFactory.create(WidgetType.ONRAMP, {});
      setWidgets({
        connect,
        wallet,
        swap,
        bridge,
        onramp
      })
      setWidgetData({
        connectData: {
          params: {},
          show: false,
        },
        walletData: {
          params: {},
          show: true,
        },
        swapData:  {
          params: {},
          show: false,
        },
        bridgeData: {
          params: {},
          show: false,
        },
        onrampData: {
          params: {},
          show: false,
        }
      });
      setWidgetsFactory(widgetsFactory)
    })
  }, [checkout]);

  return (
    <CheckoutContext.Provider value={{
      checkout,
      widgets,
      widgetData,
      setWidgetData,
      widgetsFactory
    }}>
    {children}
    </CheckoutContext.Provider>
  )
}