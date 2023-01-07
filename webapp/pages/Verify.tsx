import type { NextPage } from 'next';
import {useContext, useEffect} from 'react'; 
import { useRouter} from 'next/router';
import { MyContext } from 'lib/UserContext';
import { Loader } from '@components/dashboard/Loader';



const Verify: NextPage = () => {
    const {myId} = useContext(MyContext); 
    const router = useRouter();

  
    useEffect(()=>{
       
        console.log(myId);
        chrome.runtime.sendMessage('nlgemkboidojehdepoaebdcoanhealnb', {type:'browser',data:'63b7c87356675d60b891148f'})
        router.replace('/Dashboard');
    }, [])

    

  return (
     <Loader/>
  )
}

export default Verify;