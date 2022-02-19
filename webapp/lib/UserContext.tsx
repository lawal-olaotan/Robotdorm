import React, {FC,useState} from 'react';

interface userInfo {
    name:string,
    email:string,
    id:string,
    emailVerified:string
}


interface UserId {
    myId:userInfo;
    SetMyId: (value: React.SetStateAction<userInfo>) => void,

}


const MyContext = React.createContext<Partial<UserId>>({}); 

const ContextProvider:FC = ({children})=> {

    const [myId,SetMyId] = useState<userInfo>(); 

    return(
    <MyContext.Provider value={{
        myId,
        SetMyId
        }}>
        {children}
    </MyContext.Provider>); 
}

export {ContextProvider,MyContext}
