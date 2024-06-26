import '../styles/tailwind.css'
import '../styles/globals.css'
import '../styles/tabs.css'
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app';
import type {ReactElement, ReactNode} from 'react';
import type {NextPage} from 'next'; 
import {SessionProvider} from 'next-auth/react';
import {ContextProvider} from '../lib/UserContext';
import {PageProvider} from '../lib/PageProvider';
import {VaultProvider} from '../lib/VaultProvider';
import ReactGA from 'react-ga4';


type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({Component, pageProps: {session, ...pageProps} }: AppPropsWithLayout){
  const getLayout = Component.getLayout ?? ((page) => page )

  // initialise google analytics
  ReactGA.initialize(process.env.NEXT_PUBLIC_GA);

  
  return (
    
      <SessionProvider session={session}>
        <ContextProvider>
        <PageProvider>
          <VaultProvider>
          {getLayout(<Component {...pageProps} />)}
        </VaultProvider>
        </PageProvider>
        </ContextProvider>
      </SessionProvider>)
}




