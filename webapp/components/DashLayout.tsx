import React from 'react';
import {DashNav} from '@components/DashNav'
import {DashSide} from '@components/DashSide'; 

export const DashLayout = ({children} : {children:React.ReactNode}) => {
    return (
        <>
          <DashNav/>
          <main className="flex pt-[4.1rem] bg-dashbg h-screen">
            <DashSide/>
            {children}
          </main>
        </>

    )
}
