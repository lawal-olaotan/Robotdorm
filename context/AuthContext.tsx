import React, {FC, useState, useRef, createContext, useContext} from 'react';


type AuthProps = {
    url:string
    setUrl:React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<AuthProps>(null)

export const AuthProvider:FC = ({children})=> {
    const [url, setUrl] = useState<string>('/login');
    

    return(
        <AuthContext.Provider value={{url, setUrl}}>
           {children} 
        </AuthContext.Provider>
    )
}

/**
 * a custom hook for the auth Context
 * @returns 
 */
export default function useAuthContext(){
    const authContext = useContext(AuthContext)

    if (!authContext) {
        throw new Error('useAuth must be used within AuthContext provider')
    }

    return authContext; 
}