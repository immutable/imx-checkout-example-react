import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { checkout, passport } from '@imtbl/sdk';
import { Environment, ImmutableConfiguration } from '@imtbl/sdk/config';
import Login from './Login.tsx';
import { CheckoutProvider } from './context/CheckoutContext.tsx';

const applicationEnvironment = Environment.PRODUCTION;
const sandboxClientId = 'qy0EvYalPSwwQKyiSNt4iuDBOq9n7LML';
const productionClientId = 'KLNfnWxm7yx4DPb28sFdmdZGGPijFZfN';

// If adding Passport - Create Passport instance and add to Checkout instance
const passportInstance = new passport.Passport({
  baseConfig: new ImmutableConfiguration({ environment: applicationEnvironment, publishableKey: 'pk_imapik-iDZa1ZIvB1TvEyZctO03' }),
  clientId: applicationEnvironment === Environment.PRODUCTION 
    ? productionClientId
    : sandboxClientId, /** clientId from https://hub.immutable.com */
  redirectUri: 'http://localhost:5173/login', /** redirectUri from https://hub.immutable.com */
  logoutRedirectUri: 'http://localhost:5173/', /** logoutRedirectUri from https://hub.immutable.com */
  audience: 'platform_api',
  scope: 'openid offline_access email transact',
});

// Create Checkout instance
const checkoutInstance = new checkout.Checkout({
  baseConfig: {environment: applicationEnvironment},
  publishableKey: undefined, // get publishable key at https://hub.immutable.com
  passport: passportInstance, // configure application for Passport at https://hub.immutable.com
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login passportInstance={passportInstance} />,
  }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CheckoutProvider checkout={checkoutInstance}>
      <RouterProvider router={router} />
    </CheckoutProvider>
  </React.StrictMode>,
)
