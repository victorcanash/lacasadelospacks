import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import envConfig from '@core/config/env.config';
import { scrollToSection } from '@core/utils/navigation';
import { sendPageViewFBEvent } from '@core/utils/facebook';
import { sendPageViewGTMEvent } from '@core/utils/gtm';

import { useAuthContext } from '@lib/contexts/AuthContext';
import MainComponent from '@components/layouts/MainComponent';
import NavBar from '@components/NavBar';
import Footer from '@components/Footer';
import Banners from '@components/banners';

const WebLayout = ({ children }: { children: ReactNode }) => {
  const { paypal, currency } = useAuthContext();

  const router = useRouter();

  useEffect(() => {
    // This pageview only triggers the first time (it's important for Pixel to have real information)
    sendPageViewFBEvent();
    const handleRouteChange = (url: string) => {
      const path = window.location.hash;
      if (path && path.includes('#')) {
        scrollToSection();
      } else {
        window.scrollTo(0, 0);
      }
      sendPageViewFBEvent();
      sendPageViewGTMEvent(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const Content = () => (
    <>
      <NavBar />
      <Banners />
      <MainComponent>
        {children}
      </MainComponent>
      <Footer />
    </>
  );

  return (
    <GoogleOAuthProvider 
      clientId={envConfig.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID}
    >
      { paypal ?
        <PayPalScriptProvider
          options={{
            'locale': 'es_ES',
            'merchant-id': envConfig.NEXT_PUBLIC_PAYPAL_MERCHANT_ID,
            'client-id': envConfig.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
            'data-client-token': paypal.token,
            'currency': currency,
            'intent': 'capture',
            'components':
              paypal.advancedCards ? 'buttons,hosted-fields' : 'buttons',
            //'vault': true,
          }}
        >
          <Content />
        </PayPalScriptProvider>
        :
        <Content />
      }
    </GoogleOAuthProvider>
  );
};

export default WebLayout;
