import type { NextPage } from 'next';
import {useContext, useEffect} from 'react'; 
import { useRouter} from 'next/router';
import { MyContext } from 'lib/UserContext';
import { Loader } from '@components/dashboard/Loader';



const Verify: NextPage = () => {
    const {myId} = useContext(MyContext); 
    const router = useRouter();

  
    useEffect(()=>{
        if(myId !== undefined)
        {
        console.log(myId);
        chrome.runtime.sendMessage('nlgemkboidojehdepoaebdcoanhealnb', {type:'browser',data:'63b7c87356675d60b891148f'},res => {
            if(res.ok){
            router.replace('/Dashboard');
            }
        })
        }

    }, [])

    

  return (
     <Loader/>
  )
}

export default Verify;