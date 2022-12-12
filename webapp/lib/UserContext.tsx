import React, {FC,useState} from 'react';

 interface userInfo {
    name:string,
}


interface UserId {
    myId:userInfo;
    setMyId: (value: React.SetStateAction<userInfo>) => void,

}


const MyContext = React.createContext<Partial<UserId>>({}); 

const ContextProvider:FC = ({children})=> {

    const [myId,setMyId] = useState<userInfo>(); 

    return(
    <MyContext.Provider value={{
        myId,
        setMyId
        }}>
        {children}
    </MyContext.Provider>); 
}

export {ContextProvider,MyContext}
