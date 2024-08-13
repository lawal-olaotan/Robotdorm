import { IncomingMessage} from 'http'
import type { NextApiResponse, NextApiRequest} from "next";

type user = {
    id: string,
    email:string,
}

export interface pageData {
    req:IncomingMessage,
    view:string,
    user:user
}

export interface trackingDetails {
    req:IncomingMessage,
    view:string,
    user:user

}