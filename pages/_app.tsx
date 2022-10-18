import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
// import 'react-medium-image-zoom/dist/styles.css'
import 'styles/globals.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';

import { DefaultSeo } from 'next-seo';
import { CacheProvider, EmotionCache } from '@emotion/react';
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { SnackbarProvider } from 'notistack';

import createEmotionCache from '@core/cache/createEmotionCache';
import envConfig from '@core/config/env.config';
import { title, description } from '@lib/constants/metas';
import theme from '@lib/themes';
import { AppProvider } from '@lib/contexts/AppContext';
import { SearchProvider } from '@lib/contexts/SearchContext';
import { AuthProvider } from '@lib/contexts/AuthContext';
import { CartProvider } from '@lib/contexts/CartContext';
import ErrorBoundary from '@components/ErrorBoundary';
import MainLayout from '@components/layouts/MainLayout';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

/*const stripePromise = loadStripe(
  envConfig.NEXT_PUBLIC_STRIPE_KEY
);*/

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { 
    Component, 
    emotionCache = clientSideEmotionCache, 
    pageProps 
  } = props;

  return (
    <>
      <DefaultSeo
        title={title}
        description={description}
        openGraph={{
          type: 'website',
          title: title,
          url: `https://${envConfig.NEXT_PUBLIC_APP_URL}${props.router.asPath}`,
          description: description,
          images: [
            {
              url: `https://${envConfig.NEXT_PUBLIC_APP_URL}/logo_lg.png`,
              width: 1000,
              height: 750,
            },
          ],
          site_name: title,
        }}
      />
      <Head>
        <meta name="keywords" content="ecommerce, shop, nextjs" />
        <meta name="author" content="Victor Canas" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <CacheProvider value={emotionCache}>
        {/*<GoogleOAuthProvider clientId={envConfig.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>*/}
          {/*<Elements stripe={stripePromise}>*/}
          
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <SnackbarProvider maxSnack={3}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  
                  <ErrorBoundary>
                    <AppProvider>
                      <SearchProvider> 
                        <AuthProvider>
                          <CartProvider>
                            <MainLayout>
                              <Component {...pageProps} />
                            </MainLayout> 
                          </CartProvider>
                        </AuthProvider>          
                      </SearchProvider>
                    </AppProvider>
                  </ErrorBoundary>

                </LocalizationProvider>
              </SnackbarProvider>
            </ThemeProvider>

          {/*</Elements>*/}
        {/*</GoogleOAuthProvider>*/}
      </CacheProvider>
    </>
  )
}

export default MyApp
