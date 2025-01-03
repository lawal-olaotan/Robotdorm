import {NextPage} from 'next'; 
import React from 'react'; 


interface Props{
    labelName: string,
    type:string,
    id:string,
    placeholder:string,
    refName?: React.MutableRefObject<HTMLInputElement>
    
}

export const InputCom: NextPage<Props> = (Props) => {

    const {labelName,type,id,placeholder,refName} = Props

    return (
        <div className="flex flex-col my-4">
            <label className='text-sm' htmlFor="email">{labelName}</label>
            <input className="my-2 p-3.5 border-solid border border-grey rounded-lg" autoComplete={id} id={id} name={id} type={type} placeholder={placeholder} ref={refName} required/>
        </div>
    )
}