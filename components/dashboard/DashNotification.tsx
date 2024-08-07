import Link from 'next/link'
import {NextPage} from 'next'


interface dashNotificationProps {
        title:string,
        path:string
        pathName:string
}

export const DashNotification:NextPage<dashNotificationProps> = ({title,path,pathName}) => {

    return(
        <div className="flex lg:flex-row sm: flex-col items-center justify-center space-x-4 shadow-6xl bg-sky-100 rounded-lg sm:p-2 lg:py-1 lg:px-0 text-center mb-4">
                        <h6 className="text-center font-medium">{title}</h6>
                        <Link href={path}><a className='px-6 py-3 bg-secondary text-white my-4 rounded-md'>{pathName}</a></Link>
        </div>

    )
}