import { signIn } from "next-auth/react";
import Image from "next/image";

export const AuthProvider = () => {

    return (
        
        <div className="w-full my-6">
            <button onClick={()=> signIn('google')} className="mx-auto flex">
                <Image alt='continue with google' src="/google.svg" width={300} height={45} />
            </button>
        </div>
    )
}