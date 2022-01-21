
import React from 'react'; 
import { DashLayout } from '@components/DashLayout';

export default function Insights(){
    return (<div>
        WELCOME TO INSIGHTS
    </div>)
}
Insights.getLayout = function getLayout(page:React.ReactElement){
    return(
        <DashLayout>
            {page}
        </DashLayout>
    )
}
