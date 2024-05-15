import { useEffect } from 'react';
import ReactGA from "react-ga4";


const GaEvent = (title:string) => {

    useEffect(()=> {
        
        const params = {
            page_location:window.location.href,
            user_agent:navigator.userAgent,
            page_title:title,
            page_encoding:document.characterSet,
            language:document.documentElement.lang
        }
    
        ReactGA.event('page_view',params)
    }, [title])
}

export default  GaEvent