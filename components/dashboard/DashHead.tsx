import Head from  'next/head'
import {NextPage} from 'next'

interface Props{
    PageName:string
}

export const DashHead :NextPage<Props> = (Props) => {
    const {PageName} = Props
    return(
        <>
            <Head>
                <title>{PageName} | RobotDorm</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
        </>)
}