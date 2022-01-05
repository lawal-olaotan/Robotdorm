import {NextPage} from 'next'; 

interface Props{
    labelName: string,
    type:string,
    id:string,
    placeholder:string
}

export const InputCom: NextPage<Props> = (Props) => {

    const {labelName,type,id,placeholder} = Props

    return (
        <div className="flex flex-col mb-4">
            <label htmlFor="email">{labelName}</label>
            <input className="mt-2 p-3.5 border-solid border border-grey rounded-lg" id={id} name={id} type={type} placeholder={placeholder}/>
        </div>

    )
}