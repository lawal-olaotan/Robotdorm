import React from 'react';
// components 
import { DashLayout } from '@components/dashboard/DashLayout';
import { DashPage } from '@components/dashboard/DashPage';
import ReactGA from 'react-ga4';

export default function Dashboard({name}){

    ReactGA.send({
        hitType:"pageView",
        page:"/dashboard",
        title:"dashboard"
    })

    return (<DashPage/>)
}

 Dashboard.getLayout = function getLayout(page:React.ReactElement){
        return (
            <DashLayout>
                {page}
            </DashLayout>
        )
 }


