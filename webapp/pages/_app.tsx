import '../styles/globals.css'
import type { AppProps } from 'next/app';
import { Layouts01 } from "@components/Layouts01"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layouts01>
    <Component {...pageProps} />
  </Layouts01>
  )
  
  
}

export default MyApp
