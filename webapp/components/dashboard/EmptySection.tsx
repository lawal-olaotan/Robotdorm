import { NextPage } from 'next'; 

interface Props {
    title: string,
    text:string
}

export const EmptySection:NextPage<Props> = (Props) => {
    const {title, text} = Props;
    return (
        <>
            <div className="flex items-center justify-center w-full h-[50vh]">
            <div className="text-center">
                <h5 className="text-xl font-bold mb-4">{title}</h5>
                <p className="w-3/5 m-auto">{text}</p>
            </div>
            </div>
        </>
    )
}