import { extensionId } from "util/extension";
import { signOut } from "next-auth/react";


export async function logout (event:React.SyntheticEvent){
    event.preventDefault()
    
    try{    
        await chrome?.runtime.sendMessage(extensionId(),{
            type:"delete"
        })
    }catch(error){
        console.log("Error in logging out",)
    }
    
    signOut();
}