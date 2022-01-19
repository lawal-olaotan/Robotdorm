import {NextPage} from 'next';
import Link from 'next/link'

interface Props {

    question: string
    link : string 
    url:string
}

export const FormFooters: NextPage<Props> = (Props)=> {
    const{question,link,url} = Props
    return (
        <div className="flex"><p className="mr-1 mb-3">{question}</p><Link  href={url}><a className="text-secondary">{link}</a></Link></div>
    )
}