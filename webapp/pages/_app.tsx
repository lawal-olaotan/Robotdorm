import '../styles/globals.css'
import '../styles/tabs.css'
import type { AppProps } from 'next/app';
import type {ReactElement, ReactNode} from 'react';
import type {NextPage} from 'next'; 
import {SessionProvider} from 'next-auth/react';
import {ContextProvider} from '../lib/UserContext';
import {PageProvider} from '../lib/PageProvider';



type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({Component, pageProps: {session, ...pageProps} }: AppPropsWithLayout){
  const getLayout = Component.getLayout ?? ((page) => page )
  return (
    
      <SessionProvider session={session}>
        <ContextProvider>
        <PageProvider>
        {getLayout(<Component {...pageProps} />)}
        </PageProvider>
        </ContextProvider>
      </SessionProvider>)
}




