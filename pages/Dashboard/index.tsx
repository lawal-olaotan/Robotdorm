
import React from 'react';

// components 
import { DashLayout } from '@components/dashboard/DashLayout';
import { DashPage } from '@components/dashboard/DashPage';

export default function Dashboard(){
    return (<DashPage/>)
}

 Dashboard.getLayout = function getLayout(page:React.ReactElement){
        return (
            <DashLayout>
                {page}
            </DashLayout>
        )
 }



