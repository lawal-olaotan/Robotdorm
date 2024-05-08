
const meta  = ()=> {


    const conversion = async(body)=> {
        const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION
        const PIXEL_ID = process.env.NEXT_PUBLIC_PIXEL_ID
        const TOKEN = process.env.NEXT_PUBLIC_FB_ACCESS_ID
        const eventUrl = `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${TOKEN}.` 
         let response = await fetch(eventUrl,{
            method:'POST',
            body
         });

         let data = await response.json();
         console.log(data);
    }
    
}