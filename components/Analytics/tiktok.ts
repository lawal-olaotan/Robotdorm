import {pageData, trackingDetails}from 'types/tiktok'
import crypto from 'crypto'


const Tiktok = () => {

    const api = async(payload:any)=> {
        const token = process.env.TIKTOK_TOKEN
            const baseUrl = 'https://business-api.tiktok.com/open_api/v1.3/event/track/'
        let options= {
            headers:{
                'Content-Type': 'application/json',
               'Access-Token': token
                },
            method:"POST",
            body:JSON.stringify(payload)
        } 
        const response = await fetch(baseUrl,options)
        return response.json() 

    }


    const track = async(data:trackingDetails) => {
        const payload = await createPayload(data)
        await api(payload)
    }

    const createPayload = async(pageData:pageData) => {

        const pixelId = process.env.TIKTOK_PIXEL
        const {req, user, view} = pageData
        const {email, id} = user

        const ip = req.socket.remoteAddress ? req.socket.remoteAddress  : req.headers['x-forwarded-for']
        const url = `https://${req.headers.host}${req.url}`;
        const event_id = crypto.randomBytes(5).toString('base64').replace(/[^a-zA-Z0-9]/g, '').slice(0, 5)

        const hashedEmail = crypto.createHash('sha256').update(email).digest('hex');
        const HasedUserId = crypto.createHash('sha256').update(id).digest('hex');
        
        const data = {
            "event_source": "web",
            "event_source_id": `${pixelId}`,
            "data": [
                {
                    "event":view,
                    "event_time": Date.now(),
                    event_id,
                    "user": {
                        ip,
                        email:hashedEmail,
                        external_id:HasedUserId,
                        user_agent:"Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
                    },
                    "page": {url}
                }
            ]
        }
        return data
    }

    return {
        track
    }

}

export default Tiktok