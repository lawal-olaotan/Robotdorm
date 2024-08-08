import React,{ ReactElement } from 'react'
import Document, {Html,Head,Main, NextScript,} from 'next/document'
import { Analytics } from '@vercel/analytics/react'

  class MyDocument extends Document {

    render(): ReactElement {
        return (
          <Html lang="en">
            <Head>
              <link rel="preconnect" href="https://fonts.googleapis.com"/>
              <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
              <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
            </Head>
            <body className='bg-dashbg'>
                <Main />
                <NextScript />
                <Analytics/>
            </body>
          </Html>
        )
      }
    }
  
    
  
  
  export default MyDocument 